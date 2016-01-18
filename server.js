if (!process.env.token) {
    console.log("error: You should have an environment variable 'token' that has your Slack bot user token");
    process.exit(1);
}

var botkit = require('botkit');

var controller = botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

function saySomething(bot, message) {
    bot.api.users.info({ user: message.user }, function(err, resp) {
        var user = resp.user;
        
        if (user && user.name) {
            bot.reply(message, "I'm afraid I can't do that, " + user.name);
        } else {
            bot.reply(message, "I'm afraid I can't do that");
        }
    });
}

controller.on('direct_mention', saySomething);
controller.on('direct_message', saySomething);
controller.on('mention', saySomething);