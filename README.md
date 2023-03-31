# Building SaaS applications on PlanetScale and Netlify

This application was building for the [Building SaaS applications on PlanetScale and Netlify](https://planetscale.com/events/planetscale-netlify-saas-applications-tech-talk) Tech Talk on March 30, 2023. 

You can fully take this project and spin it up on your own Netlify account, let's go over the env vars you need.

## Required Environment Variables 🔐

| Environment Variable | Description |
| --- | --- |
| SLACK_CLIENT_ID | OAuth Client ID - identifies our Slack App for the "Add to Slack" button |
| SLACK_CLIENT_SECRET | OAuth Client Secret - authenticates us against slack for exchanging OAuth codes for tokens |
| SLACK_SIGNING_SECRET | Slack Signing Secret - use to ensure webhook requests are valid (we don't use this 🤫) |
| OPENAI_API_KEY | OpenAI API key - we need this to summarise threads! |
| ENCRYPTION_KEY | 32-bit key used to encrypt/decrypt OAuth tokens, can be generated easily with <br /><br />`openssl rand -base64 32`|

## Full Video Recording 📺

If you missed it or want to watch the video of the full talk, including live coding, get a copy of the video [here](https://blah.com/).

## Useful Links 🔗
- [Netlify Blog: New Netlify-PlanetScale Integration for Easier Deployment of Data-Intensive Apps](https://www.netlify.com/blog/planetscale-integration)
- [Netlify Docs: PlanetScale Integration](https://docs.netlify.com/integrations/planetscale-integration)
- [PlanetScale Docs: PlanetScale Workflow](https://planetscale.com/docs/concepts/planetscale-workflow)
