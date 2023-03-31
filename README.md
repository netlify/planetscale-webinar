# Netlify 🤝 PlanetScale Webinar

Hey there!

Thanks so much for coming to the webinar we hosted. (If you didn't, thanks for checking out the repo, you can catch the recording [here](https://blah.com)).

You can fully take this project and spin it up on your own Netlify account, let's go over the env vars you need.

| Environment Variable | Description |
| --- | --- |
| SLACK_CLIENT_ID | OAuth Client ID - identifies our Slack App for the "Add to Slack" button |
| SLACK_CLIENT_SECRET | OAuth Client Secret - authenticates us against slack for exchanging OAuth codes for tokens |
| SLACK_SIGNING_SECRET | Slack Signing Secret - use to ensure webhook requests are valid (we don't use this 🤫) |
| OPENAI_API_KEY | OpenAI API key - we need this to summarise threads! |
| ENCRYPTION_KEY | 32-bit key used to encrypt/decrypt OAuth tokens, can be generated easily with <br /><br />`openssl rand -base64 32`|
