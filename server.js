if (!process.env.token) {
    console.log("error: You should have an environment variable 'token' that has your Slack bot user token");
    process.exit(1);
}

var botkit = require('botkit');
var controller = botkit.slackbot({});

var channels = [];
var ims = [];
var users = [];

function reduceSlackData(source) {
    return source.reduce((acc, elem) => { acc[elem.id] = elem; return acc; }, {});
}

function cacheSlackData(err, bot, payload) {
    channels = reduceSlackData(payload.channels);
    ims = reduceSlackData(payload.ims);
    users = reduceSlackData(payload.users);
}

var bot = controller.spawn({
    token: process.env.token
}).startRTM(cacheSlackData);

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

function reactToSomething(bot, reaction) {
    bot.say({ text: "Hey, nice " + reaction.reaction, channel: reaction.item.channel});
}

controller.on('direct_mention', saySomething);
controller.on('direct_message', saySomething);
controller.on('mention', saySomething);
controller.on('reaction_added', reactToSomething);