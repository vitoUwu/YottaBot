// Copyright (C) 2022  HordLawk

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const {PermissionsBitField, EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const utils = require('../utils.js');
const configs = require('../configs.js');

module.exports = {
    active: true,
    name: 'namebans',
    description: lang => lang.get('namebansDescription'),
    cooldown: 5,
    categoryID: 3,
    perm: PermissionsBitField.Flags.Administrator,
    guildOnly: true,
    slashOptions: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'add',
            nameLocalizations: utils.getStringLocales('namebans_addLocalisedName'),
            description: 'Adds text to the list of banned text in usernames',
            descriptionLocalizations: utils.getStringLocales('namebans_manageLocalisedDesc'),
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: 'text',
                    nameLocalizations: utils.getStringLocales('namebans_addOptiontextLocalisedName'),
                    description: 'The piece of text that will be banned partially or not from the server',
                    descriptionLocalizations: utils.getStringLocales('namebans_addOptiontextLocalisedDesc'),
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: 'partial',
                    nameLocalizations: utils.getStringLocales('namebans_addOptionpartialLocalisedName'),
                    description: 'Whether the usernames should be exact or only contain the selected text',
                    descriptionLocalizations: utils.getStringLocales('namebans_addOptionpartialLocalisedName'),
                    required: false,
                },
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: 'case_sensitive',
                    nameLocalizations: utils.getStringLocales('namebans_addOptioncase_sensitiveLocalisedName'),
                    description: 'Whether username matching should be sensitive to casing or not',
                    descriptionLocalizations: utils.getStringLocales('namebans_addOptioncase_sensitiveLocalisedDesc'),
                    required: false,
                },
            ],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'remove',
            nameLocalizations: utils.getStringLocales('namebans_removeLocalisedName'),
            description: 'Removes from the list of banned text in usernames',
            descriptionLocalizations: utils.getStringLocales('namebans_removeLocalisedDesc'),
            options: [{
                type: ApplicationCommandOptionType.String,
                name: 'text',
                nameLocalizations: utils.getStringLocales('namebans_removeOptiontextLocalisedName'),
                description: 'The piece of text to be removed from the list of banned usernames',
                descriptionLocalizations: utils.getStringLocales('namebans_removeOptiontextLocalisedDesc'),
                autocomplete: true,
                required: true,
            }],
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: 'list',
            nameLocalizations: utils.getStringLocales('namebans_listLocalisedName'),
            description: 'Lists info on all currently banned usernames',
            descriptionLocalizations: utils.getStringLocales('namebans_listLocalisedName'),
        },
    ],
    addSlash: async (interaction, args) => {
        const {channelLanguage} = interaction;
        if(args.text.length > 32) return await interaction.reply({
            content: channelLanguage.get('usernameTooLong'),
            ephemeral: true,
        });
        const namebanModel = require('../../schemas/nameban.js');
        const namebanDocsCount = await namebanModel.countDocuments({guild: interaction.guild.id});
        if(namebanDocsCount >= configs.namebansLimits[+!!(
            interaction.client.guildData.get(interaction.guild.id).premiumUntil ||
            interaction.client.guildData.get(interaction.guild.id).partner
        )]) return await interaction.reply({
            content: channelLanguage.get((
                interaction.client.guildData.get(interaction.guild.id).premiumUntil ||
                interaction.client.guildData.get(interaction.guild.id).partner
            ) ? 'tooManyNamebansPremium' : 'tooManyNamebans', [configs.namebansLimits[0], configs.namebansLimits[1]]),
            ephemeral: true,
        });
        const namebanDoc = new namebanModel({
            guild: interaction.guild.id,
            text: args.case_sensitive ? args.text.toLowerCase() : args.text,
            partial: args.partial,
            caseSensitive: args.case_sensitive,
        });
        await namebanDoc.save();
        await interaction.reply(channelLanguage.get('namebanAddSuccess', [args.text]));
    },
    removeSlash: async (interaction, args) => {
        const {channelLanguage} = interaction;
        const namebanModel = require('../../schemas/nameban.js');
        const namebanDoc = await namebanModel.findByIdAndRemove(args.text);
        if(namebanDoc) return await interaction.reply(channelLanguage.get('namebanRemoveSuccess', [namebanDoc.text]));
        await interaction.reply({
            content: channelLanguage.get('namebanNotFound'),
            ephemeral: true,
        });
    },
    listSlash: async interaction => {
        const {channelLanguage} = interaction;
        const namebanModel = require('../../schemas/nameban.js');
        const namebanDocs = await namebanModel.find({guild: interaction.guild.id}).sort({createdAt: 1});
        if(!namebanDocs.length) return await interaction.reply({
            content: channelLanguage.get('noBannedUsernames'),
            ephemeral: true,
        });
        const replyData = {};
        const namebansLimit = configs.namebansLimits[+!!(
            interaction.client.guildData.get(interaction.guild.id).premiumUntil ||
            interaction.client.guildData.get(interaction.guild.id).partner
        )];
        if(namebanDocs.length >= namebansLimit) replyData.content = channelLanguage.get('disabledExtraNamebans');
        const embed = new EmbedBuilder()
            .setColor(0x2f3136)
            .setAuthor({
                name: channelLanguage.get('namebans_listEmbedAuthor'),
                iconURL: interaction.guild.iconURL({dynamic: true}),
            })
            .setTimestamp()
            .setDescription(namebanDocs.map((e, i) => {
                const str = channelLanguage.get('namebans_listEmbedDescription', [e.text, e.partial, e.caseSensitive]);
                return (i < namebansLimit) ? str : `~~${str}~~`;
            }).join('\n\n'));
        replyData.embeds = [embed];
        await interaction.reply(replyData);
    },
    removeAutocomplete: {
        text: (interaction, value) => require('../../schemas/nameban.js').find({
            guild: interaction.guild.id,
            text: {
                $regex: `^${value}`,
                $options: 'i',
            },
        }).then(docs => interaction.respond(docs.slice(0, 25).map(e => ({
            name: e.text,
            value: e._id,
        })))),
    },
};