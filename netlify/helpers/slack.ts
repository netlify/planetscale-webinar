import { App } from "@slack/bolt";

export const slackApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: "my-secret",
  scopes: [
    "channels:history",
    "chat:write",
    "commands",
    "groups:history",
    "im:history",
    "mpim:history",
  ],
});
