const member = require('../../schemas/member.js');
const role = require('../../schemas/role.js');
const {MessageEmbed, Permissions} = require('discord.js');

module.exports = {
    active: true,
    name: 'xp',
    description: lang => lang.get('xpDescription'),
    aliases: ['xp', 'exp', 'rank'],
    usage: lang => [lang.get('xpUsage0'), lang.get('xpUsage1'), lang.get('xpUsage2')],
    example: ['xp @LordHawk#0001', 'xp rank', 'xp roles'],
    cooldown: 10,
    categoryID: 4,
    guildOnly: true,
    execute: async (message, args) => {
        const channelLanguage = message.client.langs[message.client.guildData.get(message.guild.id).language];
        if(message.guild && !message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.EMBED_LINKS)) return message.reply(channelLanguage.get('botEmbed'));
        if(!message.client.guildData.get(message.guild.id).gainExp && !message.client.guildData.get(message.guild.id).voiceXpCooldown) return message.reply(channelLanguage.get('xpDisabled'));
        switch(args[0]){
            case 'rank': {
                if(message.client.guildData.get(message.guild.id).processing) return message.reply(channelLanguage.get('processing'));
                message.client.guildData.get(message.guild.id).processing = true;
                let parcialMemberDocs = await member.find({
                    guild: message.guild.id,
                    xp: {$gte: 1},
                }, 'userID xp').sort({xp: -1}).limit(500);
                console.log(parcialMemberDocs.slice(0, 100).map(e => e.userID))
                const members = await message.guild.members.fetch({user: parcialMemberDocs.map(e => e.userID)}).then(res => res.map(e => e.id));
                console.log(members.slice(0, 100));
                parcialMemberDocs = parcialMemberDocs.filter(e => members.includes(e.userID));
                const pageSize = 20;
                let memberDocs = parcialMemberDocs.slice(0, pageSize + 1);
                const memberDoc = await member.findOne({
                    guild: message.guild.id,
                    userID: message.author.id,
                    xp: {$gte: 1},
                });
                console.log(memberDoc);
                const embed = new MessageEmbed()
                    .setColor(message.guild.me.displayColor || 0x8000ff)
                    .setAuthor({
                        name: channelLanguage.get('xpRankEmbedAuthor'),
                        iconURL: message.guild.iconURL({dynamic: true}),
                    })
                    .setTimestamp()
                    .setDescription(memberDocs.slice(0, pageSize).map((e, i) => `${(e.userID === message.author.id) ? '__' : ''}**#${i + 1} -** <@${e.userID}> **|** \`${Math.floor(e.xp)}xp\`${(e.userID === message.author.id) ? '__' : ''}`).join('\n'));
                if(memberDoc){
                    const queryFilter = {
                        guild: message.guild.id,
                        xp: {$gt: memberDoc.xp},
                    };
                    if(members.includes(message.author.id)) queryFilter.userID = {$in: members};
                    const rank = await member.countDocuments(queryFilter);
                    console.log(rank);
                    embed.setFooter({text: channelLanguage.get('xpRankEmbedFooter', [rank + 1])});
                }
                message.client.guildData.get(message.guild.id).processing = false;
                const msg = await message.reply({
                    embeds: [embed],
                    components: [{
                        type: 'ACTION_ROW',
                        components: [
                            {
                                type: 'BUTTON',
                                label: channelLanguage.get('previous'),
                                style: 'PRIMARY',
                                emoji: '⬅',
                                customId: 'previous',
                                disabled: true,
                            },
                            {
                                type: 'BUTTON',
                                label: channelLanguage.get('next'),
                                style: 'PRIMARY',
                                emoji: '➡',
                                customId: 'next',
                                disabled: (memberDocs.length <= pageSize),
                            },
                        ],
                    }],
                });
                if(memberDocs.length <= pageSize) return;
                const col = msg.createMessageComponentCollector({
                    filter: componentInteraction => (componentInteraction.user.id === message.author.id),
                    time: 600000,
                    componentType: 'BUTTON',
                });
                let page = 0;
                col.on('collect', async buttonInteraction => {
                    if(buttonInteraction.customId === 'next'){
                        if(memberDocs.length <= pageSize) return;
                        memberDocs = parcialMemberDocs.slice((page + 1) * pageSize, ((page + 1) * pageSize) + pageSize + 1);
                        page++;
                    }
                    else{
                        if(!page) return;
                        memberDocs = parcialMemberDocs.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize + 1);
                        page--;
                    }
                    embed.setDescription(memberDocs.slice(0, pageSize).map((e, i) => `${(e.userID === message.author.id) ? '__' : ''}**#${page * pageSize + (i + 1)} -** <@${e.userID}> **|** \`${Math.floor(e.xp)}xp\`${(e.userID === message.author.id) ? '__' : ''}`).join('\n'));
                    await buttonInteraction.update({
                        embeds: [embed],
                        components: [{
                            type: 'ACTION_ROW',
                            components: [
                                {
                                    type: 'BUTTON',
                                    label: channelLanguage.get('previous'),
                                    style: 'PRIMARY',
                                    emoji: '⬅',
                                    customId: 'previous',
                                    disabled: !page,
                                },
                                {
                                    type: 'BUTTON',
                                    label: channelLanguage.get('next'),
                                    style: 'PRIMARY',
                                    emoji: '➡',
                                    customId: 'next',
                                    disabled: (memberDocs.length <= pageSize),
                                },
                            ],
                        }],
                    });
                });
                col.on('end', () => msg.edit({
                    embeds: [embed],
                    components: [{
                        type: 'ACTION_ROW',
                        components: [
                            {
                                type: 'BUTTON',
                                label: channelLanguage.get('previous'),
                                style: 'PRIMARY',
                                emoji: '⬅',
                                customId: 'previous',
                                disabled: true,
                            },
                            {
                                type: 'BUTTON',
                                label: channelLanguage.get('next'),
                                style: 'PRIMARY',
                                emoji: '➡',
                                customId: 'next',
                                disabled: true,
                            },
                        ],
                    }],
                }));
            }
            break;
            case 'roles': {
                let roles = await role.find({
                    guild: message.guild.id,
                    roleID: {$in: message.guild.roles.cache.map(e => e.id)},
                    xp: {
                        $exists: true,
                        $ne: null,
                    },
                }).sort({xp: -1});
                if(!roles.length) return message.reply(channelLanguage.get('noXpRoles'));
                const replyData = {};
                if((roles.length > message.client.configs.xpRolesLimit) && !message.client.guildData.get(message.guild.id).premiumUntil && !message.client.guildData.get(message.guild.id).partner) replyData.content = channelLanguage.get('disabledPremiumXpRolesNoHL');
                let embed = new MessageEmbed()
                    .setColor(message.guild.me.displayColor || 0x8000ff)
                    .setAuthor({
                        name: channelLanguage.get('xpRolesEmbedAuthor'),
                        iconURL: message.guild.iconURL({dynamic: true}),
                    })
                    .setDescription(roles.map((e, i) => {
                        const roleStr = `\`${(new Array(roles[0].xp.toString().length - e.xp.toString().length)).fill(' ').join('')}${e.xp}\` **-** <@&${e.roleID}>`;
                        return (((roles.length - i) > message.client.configs.xpRolesLimit) && !message.client.guildData.get(message.guild.id).premiumUntil && !message.client.guildData.get(message.guild.id).partner) ? `~~${roleStr}~~` : roleStr;
                    }).join('\n'));
                replyData.embeds = [embed];
                message.reply(replyData);
            }
            break;
            default: {
                let id = args[0]?.match(/^(?:<@)?!?(\d{17,19})>?$/)?.[1];
                let user = await member.findOne({
                    guild: message.guild.id,
                    userID: id || message.author.id,
                });
                if(!user) return message.reply(channelLanguage.get('noXp'));
                let roleDocs = await role.find({
                    guild: message.guild.id,
                    roleID: {$in: message.guild.roles.cache.map(e => e.id)},
                    xp: {
                        $exists: true,
                        $ne: null,
                    },
                }).sort({xp: -1});
                const availableRoles = ((roleDocs.length > message.client.configs.xpRolesLimit) && !message.client.guildData.get(message.guild.id).premiumUntil && !message.client.guildData.get(message.guild.id).partner) ? roleDocs.slice(-message.client.configs.xpRolesLimit) : roleDocs;
                let current = availableRoles.find(e => (e.xp <= user.xp));
                let next = availableRoles.reverse().find(e => (e.xp > user.xp));
                let discordMember = await message.guild.members.fetch(user.userID).catch(() => null);
                let discordUser = discordMember?.user ?? await message.client.users.fetch(id).catch(() => null);
                let embed = new MessageEmbed()
                    .setColor(discordMember?.displayColor ?? message.guild.me.displayColor ?? 0x8000ff)
                    .setAuthor({
                        name: discordUser?.tag ?? channelLanguage.get('xpEmbedAuthor'),
                        iconURL: discordUser?.displayAvatarURL({dynamic: true}),
                    })
                    .setTimestamp()
                    .setDescription(channelLanguage.get('xpEmbedDescription', [current, next, Math.floor(user.xp)]));
                message.reply({embeds: [embed]});
            }
        }
    },
    infoSlash: async (interaction, args) => {
        if(!args.user) args = {user: interaction.isUserContextMenu() ? (interaction.targetUser.member = interaction.targetMember, interaction.targetUser) : (interaction.user.member = interaction.member, interaction.user)};
        const channelLanguage = interaction.client.langs[(interaction.locale === 'pt-BR') ? 'pt' : 'en'];
        if(!interaction.client.guildData.get(interaction.guild.id).gainExp && !interaction.client.guildData.get(interaction.guild.id).voiceXpCooldown) return interaction.reply({
            content: channelLanguage.get('xpDisabled'),
            ephemeral: true,
        });
        const user = await member.findOne({
            guild: interaction.guild.id,
            userID: args.user.id,
        });
        if(!user) return interaction.reply({
            content: channelLanguage.get('noXp'),
            ephemeral: true,
        });
        const roleDocs = await role.find({
            guild: interaction.guild.id,
            roleID: {$in: interaction.guild.roles.cache.map(e => e.id)},
            xp: {
                $exists: true,
                $ne: null,
            },
        }).sort({xp: -1});
        const availableRoles = ((roleDocs.length > interaction.client.configs.xpRolesLimit) && !interaction.client.guildData.get(interaction.guild.id).premiumUntil && !interaction.client.guildData.get(interaction.guild.id).partner) ? roleDocs.slice(-interaction.client.configs.xpRolesLimit) : roleDocs;
        const current = availableRoles.find(e => (e.xp <= user.xp));
        const next = availableRoles.reverse().find(e => (e.xp > user.xp));
        let embed = new MessageEmbed()
            .setColor(args.user.member?.displayColor ?? interaction.guild.me.displayColor ?? 0x8000ff)
            .setAuthor({
                name: args.user.tag ?? channelLanguage.get('xpEmbedAuthor'),
                iconURL: args.user.displayAvatarURL({dynamic: true}),
            })
            .setTimestamp()
            .setDescription(channelLanguage.get('xpEmbedDescription', [current, next, Math.floor(user.xp)]));
        interaction.reply({embeds: [embed]});
    },
    rankSlash: async interaction => {
        const channelLanguage = interaction.client.langs[(interaction.locale === 'pt-BR') ? 'pt' : 'en'];
        if(!interaction.client.guildData.get(interaction.guild.id).gainExp && !interaction.client.guildData.get(interaction.guild.id).voiceXpCooldown) return interaction.reply({
            content: channelLanguage.get('xpDisabled'),
            ephemeral: true,
        });
        if(interaction.client.guildData.get(interaction.guild.id).processing) return interaction.reply({
            content: channelLanguage.get('processing'),
            ephemeral: true,
        });
        interaction.client.guildData.get(interaction.guild.id).processing = true;
        await interaction.deferReply();
        let parcialMemberDocs = await member.find({
            guild: interaction.guild.id,
            xp: {$gte: 1},
        }, 'userID xp').sort({xp: -1}).limit(1000);
        const members = await interaction.guild.members.fetch({user: parcialMemberDocs.map(e => e.userID)}).then(res => res.map(e => e.id));
        parcialMemberDocs = parcialMemberDocs.filter(e => members.includes(e.userID));
        const pageSize = 3;
        let memberDocs = parcialMemberDocs.slice(0, pageSize + 1);
        const memberDoc = await member.findOne({
            guild: interaction.guild.id,
            userID: interaction.user.id,
            xp: {$gte: 1},
        });
        const embed = new MessageEmbed()
            .setColor(interaction.guild.me.displayColor || 0x8000ff)
            .setAuthor({
                name: channelLanguage.get('xpRankEmbedAuthor'),
                iconURL: interaction.guild.iconURL({dynamic: true}),
            })
            .setTimestamp()
            .setDescription(memberDocs.slice(0, pageSize).map((e, i) => `${(e.userID === interaction.user.id) ? '__' : ''}**#${i + 1} -** <@${e.userID}> **|** \`${Math.floor(e.xp)}xp\`${(e.userID === interaction.user.id) ? '__' : ''}`).join('\n'));
        if(memberDoc){
            const queryFilter = {
                guild: interaction.guild.id,
                xp: {$gt: memberDoc.xp},
            };
            if(members.includes(interaction.user.id)) queryFilter.userID = {$in: members};
            const rank = await member.countDocuments(queryFilter);
            embed.setFooter({text: channelLanguage.get('xpRankEmbedFooter', [rank + 1])});
        }
        interaction.client.guildData.get(interaction.guild.id).processing = false;
        const msg = await interaction.editReply({
            embeds: [embed],
            components: [{
                type: 'ACTION_ROW',
                components: [
                    {
                        type: 'BUTTON',
                        label: channelLanguage.get('previous'),
                        style: 'PRIMARY',
                        emoji: '⬅',
                        customId: 'previous',
                        disabled: true,
                    },
                    {
                        type: 'BUTTON',
                        label: channelLanguage.get('next'),
                        style: 'PRIMARY',
                        emoji: '➡',
                        customId: 'next',
                        disabled: (memberDocs.length <= pageSize),
                    },
                ],
            }],
            fetchReply: true,
        });
        if(memberDocs.length <= pageSize) return;
        const col = msg.createMessageComponentCollector({
            filter: componentInteraction => (componentInteraction.user.id === interaction.user.id),
            time: 600000,
            componentType: 'BUTTON',
        });
        let page = 0;
        col.on('collect', async buttonInteraction => {
            if(buttonInteraction.customId === 'next'){
                if(memberDocs.length <= pageSize) return;
                memberDocs = parcialMemberDocs.slice((page + 1) * pageSize, ((page + 1) * pageSize) + pageSize + 1);
                page++;
            }
            else{
                if(!page) return;
                memberDocs = parcialMemberDocs.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize + 1);
                page--;
            }
            embed.setDescription(memberDocs.slice(0, pageSize).map((e, i) => `${(e.userID === interaction.user.id) ? '__' : ''}**#${page * pageSize + (i + 1)} -** <@${e.userID}> **|** \`${Math.floor(e.xp)}xp\`${(e.userID === interaction.user.id) ? '__' : ''}`).join('\n'));
            await buttonInteraction.update({
                embeds: [embed],
                components: [{
                    type: 'ACTION_ROW',
                    components: [
                        {
                            type: 'BUTTON',
                            label: channelLanguage.get('previous'),
                            style: 'PRIMARY',
                            emoji: '⬅',
                            customId: 'previous',
                            disabled: !page,
                        },
                        {
                            type: 'BUTTON',
                            label: channelLanguage.get('next'),
                            style: 'PRIMARY',
                            emoji: '➡',
                            customId: 'next',
                            disabled: (memberDocs.length <= pageSize),
                        },
                    ],
                }],
            });
        });
        col.on('end', () => msg.edit({
            embeds: [embed],
            components: [{
                type: 'ACTION_ROW',
                components: [
                    {
                        type: 'BUTTON',
                        label: channelLanguage.get('previous'),
                        style: 'PRIMARY',
                        emoji: '⬅',
                        customId: 'previous',
                        disabled: true,
                    },
                    {
                        type: 'BUTTON',
                        label: channelLanguage.get('next'),
                        style: 'PRIMARY',
                        emoji: '➡',
                        customId: 'next',
                        disabled: true,
                    },
                ],
            }],
        }));
    },
    rolesSlash: async interaction => {
        const channelLanguage = interaction.client.langs[(interaction.locale === 'pt-BR') ? 'pt' : 'en'];
        if(!interaction.client.guildData.get(interaction.guild.id).gainExp && !interaction.client.guildData.get(interaction.guild.id).voiceXpCooldown) return interaction.reply({
            content: channelLanguage.get('xpDisabled'),
            ephemeral: true,
        });
        const roles = await role.find({
            guild: interaction.guild.id,
            roleID: {$in: interaction.guild.roles.cache.map(e => e.id)},
            xp: {
                $exists: true,
                $ne: null,
            },
        }).sort({xp: -1});
        if(!roles.length) return interaction.reply({
            content: channelLanguage.get('noXpRoles'),
            ephemeral: true,
        });
        const replyData = {};
        if((roles.length > interaction.client.configs.xpRolesLimit) && !interaction.client.guildData.get(interaction.guild.id).premiumUntil && !interaction.client.guildData.get(interaction.guild.id).partner) replyData.content = channelLanguage.get('disabledPremiumXpRoles');
        let embed = new MessageEmbed()
            .setColor(interaction.guild.me.displayColor || 0x8000ff)
            .setAuthor({
                name: channelLanguage.get('xpRolesEmbedAuthor'),
                iconURL: interaction.guild.iconURL({dynamic: true}),
            })
            .setDescription(roles.map((e, i) => {
                const roleStr = `\`${(new Array(roles[0].xp.toString().length - e.xp.toString().length)).fill(' ').join('')}${e.xp}\` **-** <@&${e.roleID}>`;
                return (((roles.length - i) > interaction.client.configs.xpRolesLimit) && !interaction.client.guildData.get(interaction.guild.id).premiumUntil && !interaction.client.guildData.get(interaction.guild.id).partner) ? `~~${roleStr}~~` : roleStr;
            }).join('\n'))
            .setTimestamp();
        replyData.embeds = [embed];
        interaction.reply(replyData);
    },
    executeSlash: async function(...args){
        this.infoSlash(...args);
    },
    slashOptions: [
        {
            type: 'SUB_COMMAND',
            name: 'info',
            description: 'Shows the xp info of a selected user',
            options: [{
                type: 'USER',
                name: 'user',
                description: 'The user you want to see the xp info of',
                required: false,
            }]
        },
        {
            type: 'SUB_COMMAND',
            name: 'rank',
            description: 'Lists this server\'s members sorted by their xp',
        },
        {
            type: 'SUB_COMMAND',
            name: 'roles',
            description: 'Lists the roles you can aquire by earning xp',
        },
    ],
    contextName: 'Xp info',
};