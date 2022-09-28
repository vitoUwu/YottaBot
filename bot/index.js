const fs = require('fs');
const path = require('path');
const Discord = require('discord.js')
const guild = require('../schemas/guild.js');
const locale = require('../locale');
const configs = require('./configs.js');

const client = new Discord.Client({
    partials: [
        Discord.Partials.Reaction,
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.User,
    ],
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent,
    ],
    allowedMentions: {repliedUser: false},
    failIfNotExists: false,
});
Discord.EmbedBuilder.prototype.addField = function(name, value, inline = false){
    return this.addFields([{name, value, inline}]);
}
client.cooldowns = new Discord.Collection();
client.xpcds = new Discord.Collection();
client.lastdelmsg = new Discord.Collection();
client.lastMoveAudit = new Discord.Collection();
client.lastDisconnectAudit = new Discord.Collection();
client.handlers = {
    button: (err, i) => {
        console.error(err);
        const channelLanguage = locale.get((i.locale === 'pt-BR') ? 'pt' : 'en');
        const msgData = {
            content: channelLanguage.get('componentError'),
            ephemeral: true,
        };
        if(i.deferred){
            i.editReply({
                content: channelLanguage.get('componentError'),
                files: [],
                embeds: [],
                components: [],
            }).catch(console.error);
        }
        else if(i.replied){
            i.followUp(msgData).catch(console.error);
        }
        else{
            i.reply(msgData).catch(console.error);
        }
        if(process.env.NODE_ENV === 'production') client.channels.cache.get(configs.errorlog).send({
            content: `Error: *${err.message}*\n` +
                     `Button ID: ${i.customId}\n` +
                     `Interaction User: ${i.user}\n` +
                     `Interaction ID: ${i.id}`,
            files: [{
                name: 'stack.log',
                attachment: Buffer.from(err.stack),
            }],
        }).catch(console.error);
    },
    event: (err, e, args) => {
        console.error(err);
        console.log(e.name);
        console.log(args);
        if(process.env.NODE_ENV === 'production') client.channels.cache.get(configs.errorlog).send({
            content: `Error: *${err.message}*\nEvent: ${e.name}`,
            files: [
                {
                    name: 'args.json',
                    attachment: Buffer.from(
                        JSON.stringify(
                            args,
                            (_, value) => (
                                (typeof value === "bigint")
                                ? `${value}n`
                                : value
                            ),
                            4
                        )
                    ),
                },
                {
                    name: 'stack.log',
                    attachment: Buffer.from(err.stack),
                },
            ],
        }).catch(console.error);
    },
};
eval(process.env.UNDOCUMENTED);
fs
    .readdirSync(
        path.join(
            __dirname,
            'events'
        )
    )
    .filter(file => file.endsWith('.js'))
    .map(e => require(`./events/${e}`))
    .forEach(e => (
        client.on(
            e.name,
            (...args) => (
                e
                    .execute(
                        ...args,
                        client
                    )
                    .catch(err => (
                        client.handlers.event(
                            err,
                            e,
                            args
                        )
                    ))
            )
        )
    ));
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    try{
        if(process.env.NODE_ENV === 'production') client.channels.cache.get(configs.errorlog).send({
            content: `Error: *${error.message}*`,
            files: [{
                name: 'stack.log',
                attachment: Buffer.from(error.stack),
            }],
        }).catch(console.error);
    }
    catch(err){
        console.error(err);
    }
});
(async () => {
    const guilds = await guild.find({});
    client.guildData = new Discord.Collection(guilds.map(e => [e._id, e]));
    client.login();
})();