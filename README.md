# obstinate-bot

A rather unhelpful Slack bot. Seriously, he's the worst. The only thing he's actually good at is demonstrating the basic usage
of the [Slack API](https://api.slack.com/) and [botkit](http://howdy.ai/botkit)

## Usage

1) If you don't already have a bot user, create a new one at http://my.slack.com/services/new/bot

2) Grab the API Token for the new bot user integration

3) Store the token in an environment variable named 'token' and let er rip

```bash
token=<your token> node index.js
```

The bot will reply to direct messages, and all mentions (direct or indirect).

## License

MIT