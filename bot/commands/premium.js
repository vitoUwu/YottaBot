const {MessageEmbed} = require('discord.js');

module.exports = {
    active: true,
    name: 'premium',
    description: lang => lang.get('premiumDescription'),
    cooldown: 5,
    categoryID: 0,
    execute: async message => {
        const channelLanguage = (message.channel.type != 'dm') ? message.client.guildData.get(message.guild.id).language : 'en';
        if(message.client.guildData.get(message.guild.id).premium || message.client.guildData.get(message.guild.id).partner) return message.channel.send(message.client.langs[channelLanguage].get('alreadyPremium'));
        if(!message.guild.me.permissionsIn(message.channel).has('EMBED_LINKS')) return message.channel.send(message.client.langs[channelLanguage].get('botEmbed'));
        const embed = new MessageEmbed()
            .setColor(message.guild.me.displayColor || 0x8000ff)
            .setDescription(message.client.langs[channelLanguage].get('premiumEmbedDesc', [message.client.configs.support]));
        message.channel.send(embed);
    },
};