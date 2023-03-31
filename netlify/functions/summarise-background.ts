import { withPlanetscale } from "@netlify/planetscale";
import { summarise } from "../helpers/ai";
import { decrypt } from "../helpers/encrypt";
import { slackApp } from "../helpers/slack";

export const handler = withPlanetscale(async (event, context) => {
  const { connection } = context.planetscale;

  const rawBody = event.body?.split("payload=")[1];
  const body = JSON.parse(decodeURIComponent(rawBody || ""));

  const { rows } = await connection.execute(
    "SELECT bot_id, token FROM teams WHERE team_id = ?",
    [body.team.id]
  );

  if (rows.length === 0) {
    console.error(`No record found for team - ${body.team.id}`);

    return {
      statusCode: 200,
    };
  }

  const { token: encryptedToken } = rows[0] as {
    token: string;
  };
  const token = decrypt(encryptedToken, process.env.ENCRYPTION_KEY!);

  const replies = await slackApp.client.conversations.replies({
    channel: body.channel.id,
    ts: body.message.ts,
    token,
  });

  await slackApp.client.chat.postEphemeral({
    channel: body.channel.id,
    thread_ts: body.message.ts,
    user: body.user.id,
    text: `Summarising ${replies.messages?.length} messages, hold tight!`,
    token,
  });

  const messages = replies.messages ?? [];
  console.log(`Found ${messages.length} messages to summarise...`);

  const summary = await summarise(messages.map((m) => m.text ?? ""));

  await slackApp.client.chat.postMessage({
    thread_ts: body.message.ts,
    channel: body.channel.id,
    text: summary,
    token,
  });

  await connection.execute(
    "INSERT INTO summaries (channel_id, team_id, message_count, timestamp) VALUES (?, ?, ?, NOW())",
    [body.channel.id, body.team.id, messages.length]
  );

  return {
    statusCode: 200,
  };
});
