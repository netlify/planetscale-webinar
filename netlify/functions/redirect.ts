import { withPlanetscale } from "@netlify/planetscale";
import { encrypt } from "../helpers/encrypt";
import { slackApp } from "../helpers/slack";

// 1. Extract the code from the query string
// 2. Exchange the code with Slack for an access token
// 3. Create a new team in the database, or update an existing one with the new token
export const handler = withPlanetscale(async (event, context) => {
  const { code } = event.queryStringParameters ?? {};
  const { connection } = context.planetscale;

  const currentURL: URL = new URL(event.rawUrl);
  currentURL.search = "";

  const { team, access_token, bot_user_id } =
    await slackApp.client.oauth.v2.access({
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      code,
      redirect_uri: currentURL.toString(),
    });

  const { rows } = await connection.execute(
    "SELECT team_id FROM teams WHERE team_id = ?",
    [team?.id]
  );

  if (rows.length > 0) {
    console.log(`Team ${team!.id} - ${team!.name} already exists...`);

    await connection.execute(
      "UPDATE teams SET token = ?, bot_id = ? WHERE team_id = ?",
      [
        encrypt(access_token!, process.env.ENCRYPTION_KEY!),
        bot_user_id,
        team?.id,
      ]
    );
  } else {
    await connection.execute(
      "INSERT INTO teams (team_id, team_name, token, bot_id) VALUES (?, ?, ?, ?)",
      [
        team?.id,
        team?.name,
        encrypt(access_token!, process.env.ENCRYPTION_KEY!),
        bot_user_id,
      ]
    );
  }

  return {
    statusCode: 302,
    headers: {
      Location: currentURL.origin,
    },
  };
});
