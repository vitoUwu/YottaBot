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

module.exports = {
    lang: 'en',
    name: 'English',
    flag: '🇬🇧',
    get: (line, vars = []) => {
        switch(line){
            case 'mentionHelp': return `Use </help:${vars[0]}> to see all my commands!`;
            case 'blacklisted': return 'You are blacklisted from using me!';
            case 'noArgs': return (
                `You didn't provide any arguments, ${vars[0]}!\n` +
                `The proper usage would be:\n` +
                vars[1]
            );
            case 'cooldown': return `Please wait ${vars[0]} more second(s) before reusing the \`${vars[1]}\` command${vars[2] ? '' : `\nTip: Premium servers have half the cooldown for all commands\nTo get premium [join Patreon](<https://www.patreon.com/YottaBot>)`}`;
            case 'error': return `There was an error trying to execute the command \`${vars[0]}\`\nThe issue was sent to the support team and will be fixed in the near future`;
            case 'helpDescription': return 'Lists all commands or gives info about a specific one';
            case 'helpUsage': return '[(command)]';
            case 'pingDescription': return 'Ping!';
            case 'pruneDescription': return 'Deletes a given amount of messages from everyone or from a specific user in the current channel';
            case 'pruneUsage': return '(amount) [(user)]';
            case 'botEmbed': return 'I need permission to embed links in this channel';
            case 'botManageMessages': return 'I need permission to manage messages in this channel';
            case 'helpEmbedTitle': return 'Commands help';
            case 'helpEmbedDescription': return (
                `[\`Support server\`](https://discord.gg/${vars[0]})\n` +
                `[\`Invite me\`](${vars[1]})\n` +
                `[\`Extended documentation\`](https://github.com/HordLawk/YottaBot#get-started)\n` +
                `[\`Top.gg\`](https://top.gg/bot/${vars[2]})\n\n` +
                'Use the select menus below for more info about a specific command'
            );
            case 'helpEmbedFooter': return `${vars[0]} commands | [] = Optional - () = Variable - </> = Either`;
            case 'category0': return 'Commands';
            case 'category1': return 'Information';
            case 'category2': return 'Administration';
            case 'category3': return 'Moderation';
            case 'category4': return 'Levelling';
            case 'category5': return 'Miscellaneous';
            case 'invalidCommand': return 'This is not a valid command';
            case 'invalidStructure': return `The \`${vars[0]}\` command doesn't have a valid structure`;
            case 'deploySuccess': return `The \`${vars[0]}\` command was successfully deployed to ${vars[1]}`;
            case 'deployFail': return `The \`${vars[0]}\` command failed to deploy to ${vars[1]}`;
            case 'helpCommandEmbedTitle': return `Help for the ${vars[0]} command`;
            case 'helpCommandEmbedFooter': return '[] = Optional - () = Variable - </> = Either';
            case 'syntax': return 'Syntax';
            case 'example': return 'Example';
            case 'aliases': return 'Aliases';
            case 'permissionLevel': return 'Permission level';
            case 'helpCommandCooldown': return `${vars[0]} second(s)`;
            case 'terrible': return 'Terrible';
            case 'bad': return 'Bad';
            case 'normal': return 'Normal';
            case 'good': return 'Good';
            case 'average': return 'Connection';
            case 'current': return 'Response';
            case 'invalidValue': return `Invalid value. ${vars[0]}`;
            case 'maintenance': return 'Currently in maintenance, try again later';
            case 'guildOnly': return 'This command is server only';
            case 'forbidden': return 'You do not have permission to use this command';
            case 'disabled': return 'This command is disabled in this channel';
            case 'permDescription': return 'Allow or deny specific roles from using a command';
            case 'permUsage0': return '<allow/deny/default> <(role mention)/(role ID)/"(role name)"> (list of commands)';
            case 'permUsage1': return 'view <(role mention)/(role ID)/"(role name)">';
            case 'permission8': return 'Administrator';
            case 'permission268435456': return 'Manage Roles';
            case 'permission4': return 'Ban Members';
            case 'permission2': return 'Kick Members';
            case 'permission1099511627776': return 'Moderate Members';
            case 'permission16': return 'Manage Channels';
            case 'permission8192': return 'Manage Messages';
            case 'permission1': return 'Create Invite';
            case 'permission17179869184': return 'Manage Threads';
            case 'invArgs': return `Invalid arguments!\nThe proper usage would be:\n${vars[2].map(e => `\`${vars[0]}${vars[1]} ${e}\``).join('\n')}`;
            case 'permSuccess': return `**${vars[0]}** was ${(vars[1] === 'allow') ? 'allowed to use' : 'denied from using'} these commands`;
            case 'noSpecialPerms': return 'There are no special permissions set to this role';
            case 'defaultPermsSuccess': return `Special permissions for **${vars[0]}** over these commands were removed`;
            case 'permsEmbedAuthor': return 'Special permissions';
            case 'permsAllowed': return 'Allowed commands';
            case 'permsDenied': return 'Denied commands';
            case 'disableDescription': return 'Disables commands from being used in a specific channel';
            case 'disableUsage0': return '(channel) <on/off> <(list of commands)/all>';
            case 'disableUsage1': return '(channel) view';
            case 'disableAll': return `All commands are now ${(vars[0] === 'on') ? 'disabled' : 'enabled'} on ${vars[1]}`;
            case 'disableSome': return `These commands are now ${(vars[0] === 'on') ? 'disabled' : 'enabled'} on ${vars[1]}`;
            case 'permsEmbedDesc': return `Role: ${vars[0]}`;
            case 'noDisabledCmds': return 'There are no commands disabled in this channel';
            case 'disabledEmbedAuthor': return 'Channel specific commands';
            case 'disabledEmbedDesc': return `Channel: ${vars[0]}`;
            case 'disabledField': return 'Disabled';
            case 'achieveGuild': return `Congratulations ${vars[0]}! You just achieved the role ${vars[1]}`;
            case 'achieveDM': return `Congratulations! You just achieved the role **${vars[0]}** in the server **${vars[1]}**`;
            case 'msgxpDescription': return 'Manages this server\'s xp system';
            case 'msgxpUsage0': return 'enable <on/off>';
            case 'msgxpUsage1': return 'roles set (role) (xp)';
            case 'msgxpUsage2': return 'roles remove <(role)/all>';
            case 'msgxpUsage3': return 'user <add/remove/set> (xp) (list of users)';
            case 'msgxpUsage4': return 'ignore role <add/remove> (role)';
            case 'msgxpUsage5': return 'ignore channel <add/remove> (channel)';
            case 'msgxpUsage6': return 'notify <default/none/dm/(channel)>';
            case 'msgxpUsage7': return 'view';
            case 'msgxpUsage8': return 'stack <on/off>';
            case 'msgxpUsage9': return 'reset';
            case 'msgxpUsage10': return 'recommend (role amount) (max xp)';
            case 'msgxpUsage11': return 'multiplier (role) (value)';
            case 'xpEnable': return `Server xp system successfully ${(vars[0] === 'on') ? 'enabled': 'disabled'}`
            case 'xpStack': return `Role stacking successfully ${(vars[0] === 'on') ? 'enabled': 'disabled'}`
            case 'manageRole': return 'I need permissions to manage this role';
            case 'sameXp': return 'There is another role being rewarded at this amount of xp';
            case 'maxXpRoles': return 'The maximum amount of xp roles for non premium servers is 10, but you can add more with premium! To get premium [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'setXpRole': return `**${vars[0]}** is now achieveable at **${vars[1]}** xp\nbe aware that members will only get this role when they send new messages`;
            case 'resetXpRoles': return `All xp roles were removed\nbe aware that these roles won't be automatically removed from members, if you want this, it's recommended that you delete the roles from the server so no member can have it`;
            case 'removeXpRole': return `**${vars[0]}** was removed from the xp rewards\nbe aware that this role won't be automatically removed from members, if you want this, it's recommended that you delete the role from the server so no member can have it`;
            case 'setUserXp': return 'Xp values defined';
            case 'xpIgnoreRole': return `The role **${vars[0]}** ${(vars[1] === 'add') ? 'will' : 'won\'t'} be ignored from earning xp`;
            case 'xpIgnoreChannel': return `Users ${(vars[0] === 'add') ? 'won\'t' : 'will'} be able to earn xp in ${vars[1]}`;
            case 'notifyDefault': return `New role notifications will be sent ${(vars[0] === 'dm') ? 'on DMs' : 'in the channel where the achievement happened'}`;
            case 'notifyNone': return 'No new role notifications will be sent';
            case 'notifyChannel': return `New role notifications will be sent in ${vars[0]}`;
            case 'notifyDefaultView': return '\`Same channel\`';
            case 'notifyDMView': return '\`DMs\`';
            case 'notifyNoneView': return '\`None\`';
            case 'xpViewEmbedAuthor': return 'Server xp system settings';
            case 'xpViewEmbedDesc': return `Enabled: \`${vars[0] ? 'on': 'off'}\`\nStacking: \`${vars[1] ? 'off': 'on'}\`\nNotifications: ${vars[2]}`;
            case 'xpViewRoles': return 'Achieveable roles';
            case 'xpViewIgnoredRoles': return 'Ignored roles';
            case 'xpViewIgnoredChannels': return 'Ignored channels';
            case 'xpViewMultipliedRoles': return 'Xp multipliers';
            case 'resetXpConfirm': return 'This will **__RESET ALL USERS XP__** to 0, are you sure you want to proceed?';
            case 'timedOut': return 'Operation timed out';
            case 'cancelled': return 'Operation cancelled';
            case 'resetXp': return 'Server xp successfully reset';
            case 'memberManageRole': return 'You don\'t have permission to manage this role';
            case 'sendMessages': return 'I need permission to send messages in this channel';
            case 'rolemenuDescription': return 'Creates a message where users can react to claim one or more roles';
            case 'rolemenuUsage0': return 'create (channel) <(role mention)/(role ID)/"(role name)"> (emoji) [(list of roles and emojis)] [toggle]';
            case 'rolemenuUsage1': return 'edit (menu ID) <(role mention)/(role ID)/"(role name)"> (emoji) [(list of roles and emojis)] [toggle]';
            case 'maxRolesMenu': return 'The maximum amount of roles per menu is 20';
            case 'botReactions': return 'I need permission to add reactions in this channel';
            case 'maxRolemenus': return 'The maximum amount of menus for non premium servers is 10, but you can add more with premium! To get premium [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'uniqueEmoji': return 'Each emoji can only be used once per menu';
            case 'loading': return 'Loading...';
            case 'rolemenuEmbedAuthor': return 'React to claim a role';
            case 'rolemenuCreated': return 'Rolemenu successfully created';
            case 'menu404': return 'Menu not found';
            case 'rolemenuEdited': return 'Rolemenu successfully edited';
            case 'configsDescription': return 'General server settings';
            case 'configsUsage0': return 'prefix (new prefix)';
            case 'configsUsage1': return 'language <en/pt>';
            case 'configsUsage2': return 'view';
            case 'configsUsage3': return 'mod logs (channel) <warn/mute/kick/ban> [(other case types)]';
            case 'configsUsage4': return 'mod clearonban (days)';
            case 'configsUsage5': return 'massbanprotection on [(max bans per moderator per 10 seconds)]';
            case 'longPrefix': return 'A prefix can\'t have more than 10 characters';
            case 'newPrefix': return 'Server prefix updated';
            case 'lang404': return 'Language not supported';
            case 'newLang': return 'Server language updated';
            case 'configsEmbedAuthor': return 'Server settings';
            case 'configsEmbedDesc': return `Prefix: \`${vars[0]}\`\n` +
                                            `Language: \`${vars[1]}\`\n` +
                                            `Log attachments: \`${vars[2] ? 'on' : 'off'}\`\n` +
                                            `Warn log channel: ${vars[3].warn ? `<#${vars[3].warn}>` : '`none`'}\n` +
                                            'Mute/Timeout log channel: ' +
                                            `${vars[3].mute ? `<#${vars[3].mute}>` : '`none`'}\n` +
                                            `Kick log channel: ${vars[3].kick ? `<#${vars[3].kick}>` : '`none`'}\n` +
                                            `Ban log channel: ${vars[3].ban ? `<#${vars[3].ban}>` : '`none`'}\n` +
                                            `Days of messages to delete on ban: \`${vars[4]}\`\n` +
                                            `Max bans per moderator per 10 seconds: \`${vars[5] ?? '∞'}\`\n` +
                                            `Global bans: \`${vars[6] ? 'on' : 'off'}\`\n` +
                                            `Welcome channel: ${vars[8] ? `<#${vars[8]}>` : '`none`'}\n` +
                                            `Track invites: \`${vars[9] ? 'on' : 'off'}\`\n` +
                                            `Beta features: \`${vars[7] ? 'on' : 'off'}\``;
            case 'betaCommand': return 'This command is currently only available for servers that enabled open beta features in the bot settings';
            case 'premiumCommand': return `This command is a premium feature, to get premium [join Patreon](<https://www.patreon.com/YottaBot>)`;
            case 'botWebhooks': return 'I need permission to manage webhooks in this channel';
            case 'executor': return `\nExecutor: ${vars[0]}`;
            case 'delmsgEmbedAuthor': return 'Deleted message';
            case 'delmsgEmbedAuthorTitle': return 'Author';
            case 'delmsgEmbedChannelTitle': return 'Channel';
            case 'delmsgEmbedExecutorTitle': return 'Executor';
            case 'delmsgEmbedSentTitle': return 'Sent';
            case 'delmsgEmbedSentValue': return `<t:${vars[0]}>`;
            case 'delmsgEmbedAttachmentsTitle': return 'Attachments';
            case 'delmsgEmbedAttachmentsMedia': return `[\`Attachment-${vars[0]}-Media\`](${vars[1]})`;
            case 'delmsgEmbedAttachmentsFile': return `[\`Attachment-${vars[0]}-File\`](${vars[1]})`;
            case 'actionlogsDescription': return 'Manages action logs for the server';
            case 'actionlogsUsage0': return 'defaultchannel (channel)';
            case 'actionlogsUsage1': return 'set <delmsg/prune/editmsg/memberjoin/memberleave/voiceconnect/voicedisconnect/voicemove> <(channel)/default>';
            case 'actionlogsUsage2': return 'ignore channel <add/remove> (channel) <delmsg/prune/editmsg/voiceconnect/voicedisconnect/all>';
            case 'actionlogsUsage3': return 'ignore channel view (channel)';
            case 'actionlogsUsage4': return 'ignore role <add/remove> (role) <delmsg/prune/editmsg/memberleave/voiceconnect/voicedisconnect/all>';
            case 'actionlogsUsage5': return 'ignore role view (role)';
            case 'newDefaultHookReason': return 'Default log channel webhook';
            case 'oldDefaultHookReason': return 'Old default log channel webhook';
            case 'newDefaultLog': return `Default log channel set to ${vars[0]}`;
            case 'noDefaultLog': return 'Default log channel not defined';
            case 'oldHookReason': return `Old ${vars[0]} log channel webhook`;
            case 'newDefaultLogSuccess': return 'This action was set to log in the default log channel';
            case 'newHookReason': return `${vars[0]} log channel webhook`;
            case 'newLogSuccess': return `This action was set to log in ${vars[0]}`;
            case 'removeLogSuccess': return 'This action won\'t be logged';
            case 'noIgnoredActionsChannel': return 'No action is being ignored in this channel'
            case 'ignoredActionsChannelEmbedAuthor': return 'Ignored channel';
            case 'ignoredActionsChannelEmbedDesc': return `Channel: ${vars[0]}`;
            case 'ignoredActionsEmbedFooter': return `${vars[0]} ignored actions`;
            case 'ignoredActionsEmbedActionsTitle': return 'Actions';
            case 'actiondelmsg': return '**deleted messages**';
            case 'actionprune': return '**pruned messages**';
            case 'actioneditmsg': return '**edited messages**';
            case 'actionmemberjoin': return '**joined members**';
            case 'actionmemberleave': return '**left members**';
            case 'actionvoiceconnect': return '**voice connections**';
            case 'actionvoicedisconnect': return '**voice disconnections**';
            case 'actionvoicemove': return '**voice moves**';
            case 'noIgnoredActionsRole': return 'No actions are being ignored for this role';
            case 'ignoredActionsRoleEmbedAuthor': return 'Ignored role';
            case 'ignoredActionsRoleEmbedDesc': return `Role: ${vars[0]}`;
            case 'allActionsIgnoredChannelSuccess': return `All actions will be ignored in ${vars[0]}`;
            case 'noActionsIgnoredChannelSuccess': return `No actions will be ignored in ${vars[0]}`;
            case 'allActionsIgnoredRoleSuccess': return `All actions will be ignored for **${vars[0]}**`;
            case 'noActionsIgnoredRoleSuccess': return `No actions will be ignored for **${vars[0]}**`;
            case 'actionIgnoredChannelSuccess': return `**${vars[0]}** will be ignored in ${vars[1]}`;
            case 'actionNotIgnoredChannelSuccess': return `**${vars[0]}** won't be ignored in ${vars[1]}`;
            case 'actionIgnoredRoleSuccess': return `**${vars[0]}** will be ignored for **${vars[1]}**`;
            case 'actionNotIgnoredRoleSuccess': return `**${vars[0]}** won't be ignored for **${vars[1]}**`;
            case 'logsViewEmbedAuthor': return 'Action logs info';
            case 'logsViewEmbedDesc': return `Default channel: ${vars[0] ? `<#${vars[0]}>` : '\`none\`'}`;
            case 'logsViewEmbedActionsTitle': return 'Logged actions';
            case 'logsViewEmbedActions': return `**${vars[0]}** - ${vars[1] ? `<#${vars[1]}>` : '`Default`'}`
            case 'logsViewEmbedIgnoredChannelsTitle': return 'Ignored channels';
            case 'logsViewEmbedIgnoredRolesTitle': return 'Ignored roles';
            case 'logsViewEmbedIgnoredSome': return 'Some';
            case 'logsViewEmbedIgnoredAll': return 'All';
            case 'logattachmentsBadArgs': return 'Choose to turn this setting `on` or `off`';
            case 'logattachmentsNoHook': return 'Choose a channel to log deleted messages first';
            case 'logattachmentsNoNSFW': return 'To use this settings your deleted messages log channel needs to be set to NSFW';
            case 'logattachmentsOnSuccess': return 'Attachments will be logged';
            case 'logattachmentsOffSuccess': return 'Attachments will not be logged';
            case 'premiumDescription': return 'Manage server premium';
            case 'alreadyPremium': return 'This server already has access to premium features';
            case 'premiumEmbedDesc': return `Buying premium status is not ready yet, if you wish to apply for partnership or pay for premium directly **[join the support server](https://discord.gg/${vars[0]})** and contact the developers`;
            case 'banDescription': return 'Bans an user';
            case 'banUsage': return '(user) [(reason)]';
            case 'invUser': return 'Invalid user';
            case 'cantBan': return 'I can\'t ban this member';
            case 'youCantBan': return 'You can\'t ban this member';
            case 'dmBanned': return `You were banned in **${vars[0]}**${vars[1] ? `\n__Reason:__ *${vars[1]}*` : ''}`;
            case 'alreadyBanned': return 'This user is already banned';
            case 'banReason': return `Executor: ${vars[0]}${vars[1] ? ` | Reason: ${vars[1]}` : ''}`;
            case 'memberBanSuccess': return `Member banned\nCase ID: \`${vars[0]}\``;
            case 'banEmbedAuthor': return `${vars[0]} banned ${vars[1]}`;
            case 'banEmbedDescription': return `[\`Action message\`](${vars[0]})`;
            case 'banEmbedTargetTitle': return 'Target';
            case 'banEmbedTargetValue': return `${vars[0]}\n${vars[0].id}`;
            case 'banEmbedExecutorTitle': return 'Executor';
            case 'banEmbedFooter': return `Case ${vars[0]}`;
            case 'banEmbedReasonTitle': return 'Reason';
            case 'checkDescription': return 'Shows an user\'s cases';
            case 'checkUsage': return '(user) <all/warn/mute/kick/ban> [(time filter)]';
            case 'invLogs': return 'No logs meeting these conditions were found';
            case 'checkEmbedAuthor': return 'Cases';
            case 'checkEmbedFooter': return `${vars[0]} cases found`;
            case 'checkEmbedCaseTitle': return `Case ${vars[0]}`;
            case 'checkEmbedCaseValueTarget': return `${vars[0].actionMessage ? `[\`Action message\`](${vars[0].actionMessage})\n` : ''}Type: \`${vars[0].removal ? `${'un'}${vars[0].type}` : vars[0].type}\`\n${vars[0].executor ? `Executor: <@${vars[0].executor}>\n` : ''}${vars[1] ? `Duration: \`${vars[1][0] ? `${vars[1][0]}d` : ''}${vars[1][1] ? `${vars[1][1]}h` : ''}${vars[1][2] ? `${vars[1][2]}m` : ''}\`\n` : ''}${vars[0].reason ? `Reason: *${vars[0].reason.slice(0, 250)}*\n` : ''}Date: <t:${Math.floor(vars[0].timeStamp.getTime() / 1000)}>${vars[0].image ? `\n[\`Media\`](${vars[0].image})` : ''}`;
            case 'checkEmbedCaseValueExecutor': return `${vars[0].actionMessage ? `[\`Action message\`](${vars[0].actionMessage})\n` : ''}Type: \`${vars[0].removal ? `${'un'}${vars[0].type}` : vars[0].type}\`\nTarget: <@${vars[0].target}>\n${vars[1] ? `Duration: \`${vars[1][0] ? `${vars[1][0]}d` : ''}${vars[1][1] ? `${vars[1][1]}h` : ''}${vars[1][2] ? `${vars[1][2]}m` : ''}\`\n` : ''}${vars[0].reason ? `Reason: *${vars[0].reason.slice(0, 250)}*\n` : ''}Date: <t:${Math.floor(vars[0].timeStamp.getTime() / 1000)}>${vars[0].image ? `\n[\`Media\`](${vars[0].image})` : ''}`;
            case 'modLogsSetSuccess': return `Log channel for ${vars[0].map(e => `\`${e}\``).join(' ')} set to ${vars[1]}`;
            case 'invClearOnBanDays': return 'Number of days must be between 0 and 7';
            case 'clearOnBanDaysSetSuccess': return `Number of days of messages to delete on bans set to **${vars[0]}**`;
            case 'invRole': return 'Role not found';
            case 'muteRoleSetSuccess': return `Mute role set to **${vars[0]}**`;
            case 'autoSetupMuteSetSuccess': return `Auto setup mute mode turned **${vars[0]}**`;
            case 'inviteDescription': return 'Gives you an url to add the bot to your server';
            case 'inviteEmbedDescription': return `**[Invite](${vars[0]})** me to your server!`;
            case 'muteDescription': return 'Mutes/Timeouts a member';
            case 'muteUsage': return '(member) (duration) [(reason)]';
            case 'invMember': return 'Member not found';
            case 'youCantMute': return 'You can\'t moderate this member';
            case 'iCantMute': return 'I can\'t moderate this member';
            case 'invMuteDuration': return 'Invalid mute/timeout duration';
            case 'alreadyMuted': return 'This member is already muted/timeoutted';
            case 'botManageRolesServer': return 'I can\'t manage roles in this server';
            case 'botModerateMembersServer': return 'I can\'t moderate members in this server';
            case 'cantGiveMuteRole': return 'I can\'t give the mute role to users';
            case 'noMuteRole': return 'No mute role was defined and the auto setup mute mode is disabled';
            case 'muteRoleName': return 'Muted';
            case 'muteMemberSuccess': return `Member muted/timeoutted\nCase ID: \`${vars[0]}\``;
            case 'muteRoleSetupReason': return 'Mute role permissions setup';
            case 'muteEmbedAuthor': return `${vars[0]} muted/timeoutted ${vars[1]}`;
            case 'muteEmbedDescription': return `[\`Action message\`](${vars[0]})`;
            case 'muteEmbedTargetTitle': return 'Target';
            case 'muteEmbedTargetValue': return `${vars[0]}\n${vars[0].id}`;
            case 'muteEmbedExecutorTitle': return 'Executor';
            case 'muteEmbedDurationTitle': return 'Duration';
            case 'muteEmbedDurationValue': return `${vars[0] ? `${vars[0]}d` : ''}${vars[1] ? `${vars[1]}h` : ''}${vars[2] ? `${vars[2]}m` : ''}\n<t:${vars[3]}:R>`;
            case 'muteEmbedFooter': return `Case ${vars[0]}`;
            case 'muteEmbedReasonTitle': return 'Reason';
            case 'activatePremium': return `You have **${vars[0] ?? 0}** premium keys remaining`;
            case 'confirm': return 'Confirm';
            case 'cancel': return 'Cancel';
            case 'previous': return 'Previous';
            case 'next': return 'Next';
            case 'activatePremiumSuccess': return 'Premium features activated';
            case 'reasonDescription': return 'Edits the reason for a mod case';
            case 'reasonUsage': return '(case ID) (new reason)';
            case 'invCase': return 'Case not found';
            case 'youCantEditCase': return 'You can\'t edit this case';
            case 'reasonEditSuccess': return 'Reason edited';
            case 'reasonEmbedTargetTitle': return 'Target';
            case 'reasonEmbedTargetValue': return `<@${vars[0]}>\n${vars[0]}`;
            case 'reasonEmbedExecutorTitle': return 'Executor';
            case 'reasonEmbedExecutorValue': return `<@${vars[0]}>`;
            case 'reasonEmbedDurationTitle': return 'Duration';
            case 'reasonEmbedDurationValue': return `${vars[0] ? `${vars[0]}d` : ''}${vars[1] ? `${vars[1]}h` : ''}${vars[2] ? `${vars[2]}m` : ''}\n<t:${vars[3]}:R>`;
            case 'reasonEmbedReasonTitle': return 'Reason';
            case 'supportDescription': return 'Gives you an invite to the support server';
            case 'supportEmbedDescription': return `**[Join](https://discord.gg/${vars[0]})** my support server!`;
            case 'unbanDescription': return 'Unbans an user';
            case 'unbanUsage': return '(user) [(reason)]';
            case 'invBanned': return 'Banned user not found';
            case 'cantUnban': return 'I don\'t have permission to unban users';
            case 'unbanAuditReason': return `Executor: ${vars[0]}${vars[1] ? ` | Reason: ${vars[1]}` : ''}`;
            case 'unbanSuccess': return `User unbanned\nCase ID: \`${vars[0]}\``;
            case 'unbanEmbedAuthor': return `${vars[0]} unbanned ${vars[1]}`;
            case 'unbanEmbedDescription': return `[\`Action message\`](${vars[0]})`;
            case 'unbanEmbedTargetTitle': return 'Target';
            case 'unbanEmbedTargetValue': return `${vars[0]}\n${vars[0].id}`;
            case 'unbanEmbedExecutorTitle': return 'Executor';
            case 'unbanEmbedFooter': return `Case ${vars[0]}`;
            case 'unbanEmbedReasonTitle': return 'Reason';
            case 'unmuteDescription': return 'Unmutes an user';
            case 'unmuteUsage': return '(user) [(reason)]';
            case 'youCantUnmute': return 'You can\'t unmute this member';
            case 'invMuteRole': return 'Mute role not found';
            case 'cantManageMuteRole': return 'I can\'t manage the mute role';
            case 'invMuted': return 'Muted/Timeoutted user not found';
            case 'unmuteSuccess': return `Member unmuted\nCase ID: \`${vars[0]}\``;
            case 'unmuteEmbedAuthor': return `${vars[0]} unmuted ${vars[1] || 'someone'}`;
            case 'unmuteEmbedDescription': return `[\`Action message\`](${vars[0]})`;
            case 'unmuteEmbedTargetTitle': return 'Target';
            case 'unmuteEmbedTargetValue': return `<@${vars[0]}>\n${vars[0]}`;
            case 'unmuteEmbedExecutorTitle': return 'Executor';
            case 'unmuteEmbedFooter': return `Case ${vars[0]}`;
            case 'unmuteEmbedReasonTitle': return 'Reason';
            case 'warnDescription': return 'Warns a member';
            case 'warnUsage': return '(user) [(reason)]';
            case 'cantWarnBot': return 'I can\'t warn a bot';
            case 'youCantWarn': return 'You are not allowed to warn this member';
            case 'dmWarned': return `You were warned in **${vars[0]}**${vars[1] ? `\n__Reason:__ *${vars[1]}*` : ''}`;
            case 'warnedBlockedDms': return 'The warn couldn\'t be DMed to the user. This usually happens when a user disables DMs for this server';
            case 'warnSuccess': return `Member warned\nCase ID: \`${vars[0]}\``;
            case 'warnEmbedAuthor': return `${vars[0]} warned ${vars[1]}`;
            case 'warnEmbedDescription': return `[\`Action message\`](${vars[0]})`;
            case 'warnEmbedTargetTitle': return 'Target';
            case 'warnEmbedTargetValue': return `${vars[0]}\n${vars[0].id}`;
            case 'warnEmbedExecutorTitle': return 'Executor';
            case 'warnEmbedFooter': return `Case ${vars[0]}`;
            case 'warnEmbedReasonTitle': return 'Reason';
            case 'xpDescription': return 'Tells a member\'s xp in a server';
            case 'xpUsage0': return '[(user)]';
            case 'xpUsage1': return 'rank';
            case 'xpUsage2': return 'roles';
            case 'xpDisabled': return 'The xp system is disabled in this server';
            case 'lbDeprecated': return 'The `lb` argument is deprecated and will be removed at a future update, please use `rank` instead';
            case 'xpRankEmbedAuthor': return 'Xp ranking';
            case 'xpRankEmbedFooter': return `You are ranked at #${vars[0]}`;
            case 'noXpRoles': return 'There are no xp roles in this server';
            case 'xpRolesEmbedAuthor': return 'Xp roles';
            case 'noXp': return 'This member does not yet have any xp';
            case 'xpEmbedAuthor': return 'Xp';
            case 'xpEmbedDescription': return `${vars[0] ? `Current level: <@&${vars[0].roleID}>\n` : ''}${vars[1] ? `Next level: <@&${vars[1].roleID}>\n` : ''}Progress: **${vars[2]}${vars[1] ? `/${vars[1].xp}` : ''}**`;
            case 'xpEmbedFooter': return `#${vars[0]}`;
            case 'dmBotAdder': return `Greetings ${vars[0]}! Thank you for adding me to **${vars[1]}**. Since I am a highly customizable bot, I recommend that you start by having a look at </help:${vars[2]}>\n\nIf you need any help, don\'t hesitate to **[join my support server](https://discord.gg/${vars[3]})**, you can also read the **[full documentation](https://github.com/HordLawk/YottaBot#get-started)** for more detailed information`;
            case 'autoUnmuteEmbedAuthorMember': return `${vars[0]} was unmuted`;
            case 'autoUnmuteEmbedAuthorNoMember': return 'Unmute';
            case 'autoUnmuteEmbedTargetTitle': return 'Target';
            case 'autoUnmuteEmbedTargetValue': return `<@${vars[0]}>\n${vars[0]}`;
            case 'autoUnmuteEmbedReasonTitle': return 'Reason';
            case 'autoUnmuteEmbedReasonValue': return 'End of mute/timeout';
            case 'autoUnmuteEmbedDescription': return `[\`Referred mute/timeout\`](${vars[0]})`;
            case 'kickDescription': return 'Kicks a member from a server';
            case 'kickUsage': return '(user) [(reason)]';
            case 'cantKick': return 'I can\'t kick this member';
            case 'youCantKick': return 'You can\'t kick this member';
            case 'kickAuditReason': return `Executor: ${vars[0]}${vars[1] ? ` | Reason: ${vars[1]}` : ''}`;
            case 'kickSuccess': return `Member kicked\nCase ID: \`${vars[0]}\``;
            case 'kickEmbedAuthor': return `${vars[0]} kicked ${vars[1]}`;
            case 'kickEmbedDescription': return `[\`Action message\`](${vars[0]})`;
            case 'kickEmbedTargetTitle': return 'Target';
            case 'kickEmbedTargetValue': return `${vars[0]}\n${vars[1]}`;
            case 'kickEmbedExecutorTitle': return 'Executor';
            case 'kickEmbedFooter': return `Case ${vars[0]}`;
            case 'kickEmbedReasonTitle': return 'Reason';
            case 'massbanDescription': return 'Bans many users at the same time';
            case 'massbanUsage': return '(user) [(list of users)] [(reason)]';
            case 'massbanSuccess': return `${vars[0] ? `${vars[0]} users banned\n` : ''}` +
                                          `${vars[1] ? `${vars[1]} invalid users\n` : ''}` +
                                          `${vars[2] ? `${vars[2]} users could not be banned\n` : ''}` +
                                          `${vars[3] ? `${vars[3]} users were already banned\n` : ''}` +
                                          `${vars[4] ? '' : '\nNote that non premium servers have a massban limit of **300** users\n' +
                                                            'To upgrade this to **1000** you can get premium by [joining Patreon](<https://www.patreon.com/YottaBot>)'}`;
            case 'firstBoost': return `Congratulations ${vars[0]}, you boosted **${vars[1]}** and was rewarded with a premium key, use the \`/premium activate\` commannd in any server to activate its premium features`;
            case 'renewBoost': return `Thank you for boosting **${vars[0]}** for another month! You got a premium key as a reward, use the \`/premium activate\` commannd in any server to activate its premium features`;
            case 'recommendMinLevels': return 'You can\'t ask for recommendations for less than 2 levels';
            case 'recommendMinXp': return 'Highest level xp has to be at least 13';
            case 'recommendXpNotEnough': return `**${vars[0]}** is not enough xp for **${vars[1]}** levels`;
            case 'recommendSuccess': return `The recommended xp amounts are ${vars[0].map(e => `\`${Math.round(e / 20)}\``).join(' ')}`;
            case 'infoEmbedAuthor': return 'YottaBot information';
            case 'infoEmbedDescription': return `[\`Invite me\`](${vars[0]})`;
            case 'infoEmbedVersionTitle': return 'Version';
            case 'infoEmbedEngineTitle': return 'Engine';
            case 'infoEmbedEngineValue': return `Node.js ${vars[0]}`;
            case 'infoEmbedLibraryTitle': return 'Library';
            case 'infoEmbedLibraryValue': return `discord.js v${vars[0]}`;
            case 'infoEmbedDeveloperTitle': return 'Developer';
            case 'infoEmbedDeveloperValue': return `[${vars[0]}](https://discord.com/users/${vars[1]})`;
            case 'infoEmbedUptimeTitle': return 'Last login';
            case 'infoEmbedUptimeValue': return `<t:${Math.floor(vars[0] / 1000)}:R>`;
            case 'infoEmbedRAMTitle': return 'RAM usage';
            case 'infoEmbedRAMValue': return `${(vars[0] / 1048576).toFixed(2)} MB`;
            case 'infoEmbedSupportTitle': return 'Support server';
            case 'infoEmbedSupportValue': return `[\`discord.gg/${vars[0]}\`](https://discord.gg/${vars[0]})`;
            case 'infoEmbedRepoTitle': return 'Source code';
            case 'infoEmbedRepoValue': return '[\`github.com/HordLawk/YottaBot\`](https://github.com/HordLawk/YottaBot)';
            case 'infoEmbedPrivacyTitle': return 'Privacy policy';
            case 'infoEmbedPrivacyValue': return '[\`yottabot.dev/privacy\`](https://yottabot.dev/privacy)';
            case 'upvoteDescription': return 'Upvote me on Top.gg';
            case 'upvoteEmbedDescription': return `**[Upvote me](https://top.gg/bot/${vars[0]}/vote)** on Top.gg!`;
            case 'voiceXpEmbedAuthor': return 'Voice xp system settings';
            case 'voiceXpEmbedDesc': return `Enabled: ${vars[0] ? `\`on\`\nCooldown: \`${vars[0]} minutes\``: '`off`'}`;
            case 'voiceXpIgnoredChannels': return 'Ignored voice channels';
            case 'betaSuccess': return `Beta features turned **${vars[0] ? 'on' : 'off'}**`;
            case 'voicexpDescription': return 'Manages xp earnings in voice channels';
            case 'voicexpUsage0': return 'enable (cooldown minutes)';
            case 'voicexpUsage1': return 'ignore <add/remove> (channel)';
            case 'invCooldown': return 'Cooldown minutes has to be an integer between 1 and 59';
            case 'voicexpEnableSuccess': return `Xp earning in voice channels was enabled and its cooldown was set to ${vars[0]}`;
            case 'voicexpDisableSuccess': return 'Xp earning in voice channels disabled';
            case 'slashOnly': return (
                `The \`${vars.commandName}\` command can only be executed through Discord's built in slash commands` +
                ` feature\n` +
                `Click a command below for the correct usage:\n` +
                vars.usages
            );
            case 'processing': return 'This command is currently already being processed somewhere in this server\nTry again later';
            case 'invMassBanProtectionAmount': return 'Invalid amount of bans in 10 seconds';
            case 'massBanProtectionSuccess': return `Mass ban protection setting was turned \`${vars[0]}\``;
            case 'multiplierSuccess': return `The xp multiplier for ${vars[0]} was successfully set to \`${vars[1]}\``;
            case 'editmsgEmbedAuthor': return 'Edited message';
            case 'editmsgEmbedDescription': return `**Old content:**\n${vars[0] || '*Empty*\n'}\n**New content:**\n${vars[1] || '*Empty*'}`;
            case 'atwoodDescription': return 'Quotes Atwood\'s Law';
            case 'atwoodsLaw': return '> Any application that can be written in JavaScript, will eventually be written in JavaScript.\n- Jeff Atwood (2007)';
            case 'globalBanReason': return 'User is globally banned';
            case 'globalbanSuccess': return `Global bans turned **${vars[0]}**`;
            case 'undo': return 'Undo';
            case 'banUndone': return 'Ban undone';
            case 'muteMemberUndone': return '~~Member muted/timeoutted~~ *undone*';
            case 'muteUndone': return 'Mute/Timeout undone';
            case 'language': return 'Server language';
            case 'premiumKeysLabel': return 'Use key';
            case 'premiumPatreonLabel': return 'Use Patreon reward';
            case 'pledgeNotFound': return 'Your patreon membership was not found\nIf you think this is a mistake make sure your Discord account is connected to your patreon account\n[This article](https://support.patreon.com/hc/en-us/articles/212052266) will guide you through doing so\nIf you are not yet a YottaBot patron [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'noRewardsRemaining': return 'You have already used all your Patreon rewards, wait until one of the premiums you claimed expires to use it on this server';
            case 'patreonRewardClaimed': return 'You successfully activated premium features in this server using your Patreon rewards\nDo you wish for this to be automatically renewed monthly?';
            case 'enableRenew': return 'Renew monthly';
            case 'renewEnabled': return 'The premium features for this server will be automatically renewed';
            case 'notPatron': return 'You are not currently using Patreon rewards in any server\nIf you are not yet a YottaBot patron [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'unknownGuild': return 'Unknown server';
            case 'premiumInfoFieldValue': return `**Expires:** <t:${vars[0]}>\n**Monthly renew:** ${vars[1] ? '`on`' : '`off`'}`;
            case 'invGuild': return 'Invalid server';
            case 'renewChangeSuccess': return `Premium status for **${vars[0]}** ${vars[1] ? 'will' : 'won\'t'} automatically renew monthly`;
            case 'premiumUsage0': return 'renew <on/off> (server)';
            case 'delmsgActionName': return 'Deleted messages';
            case 'editmsgActionName': return 'Edited messages';
            case 'pruneActionName': return 'Pruned messages';
            case 'cantIgnoreEveryone': return 'Actions can\'t be ignored from @everyone\nIf you don\'t want this action to be logged use \`/actionlogs actions remove (action)\`';
            case 'invAction': return 'Invalid action';
            case 'delmsgEmbedStickerTitle': return 'Sticker';
            case 'noStickerFound': return 'This is not a sticker!';
            case 'getstickerContent': return '**Sticker file:**';
            case 'add': return 'Add';
            case 'stickerCreator': return `Added by ${vars[0]} (${vars[1]})`;
            case 'stickerAdded': return 'Sticker successfully added';
            case 'maxStickersReached': return 'Maximum number of stickers reached';
            case 'componentError': return 'There was an error!\nThe issue was sent to the support team and will be fixed in the near future';
            case 'disabledPremiumXpRoles': return 'Since the number of xp roles exceeded the limit for non premium servers, the highest roles over this limit were temporarily disabled\nYou can make these roles achievable again with premium, to get premium [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'disabledPremiumXpRolesNoHL': return 'Since the number of xp roles exceeded the limit for non premium servers, the highest roles over this limit were temporarily disabled\nYou can make these roles achievable again with premium, to get premium join Patreon: <https://patreon.com/YottaBot>';
            case 'getstickerDescription': return 'Replies with the file for the first sticker in the target message\nIf you have permission to add stickers it will also show a button to upload the file as a sticker in the current server\n(Only as message context menu)';
            case 'memberjoinActionName': return 'Joined members';
            case 'memberjoinEmbedAuthor': return `${vars[0]} joined the server`;
            case 'memberjoinEmbedCreationTitle': return 'Account creation';
            case 'memberjoinEmbedCreationValue': return `<t:${vars[0]}> (<t:${vars[0]}:R>)`;
            case 'banButton': return 'Ban';
            case 'cantEditSlowmode': return `You don\'t have permission to edit ${vars[0]} slowmode`;
            case 'botCantEditSlowmode': return `I need permission to manage ${vars[0]} in order to edit its slowmode`;
            case 'slowmodeEdited': return `The slowmode at ${vars[3]} was successfully edited to **${vars[0] ? `${vars[0]}h` : ''}${vars[1] ? `${vars[1]}m` : ''}${vars[2] ? `${vars[2]}s` : ''}**`;
            case 'slowmodeRemoved': return `The slowmode at ${vars[0]} was successfully removed`;
            case 'slowmodeUsage': return '(cooldown) [(channel)]';
            case 'slowmodeDescription': return 'Edits the slowmode cooldown in a chosen channel';
            case 'pruneSuccess': return `All **${vars[0]}** messages were successfully deleted`;
            case 'prunePartial': return `Only **${vars[0]}** out of **${vars[1]}** messages deleted\nNote that messages older than 2 weeks or sent before the last 1000 messages in this channel cannot be deleted\nPinned messages are purposely also not deleted`;
            case 'invalidPruneAmount': return 'Number of messages to delete must be between 2 and 999';
            case 'slowValueTooHigh': return 'Slowmode cooldown cannot be over 6 hours';
            case 'delcasesDescription': return 'Deletes one or more logged cases from the current server';
            case 'delcasesUsage0': return 'user (user)';
            case 'delcasesUsage1': return 'case (ID)';
            case 'resetServerCasesConfirm': return 'Are you sure you want to deleted all of this server\'s logged cases?\nThis action cannot be undone';
            case 'resetServerCasesSuccess': return 'All server logged cases were successfully deleted';
            case 'resetUserCasesConfirm': return `Are you sure you want to delete all logged cases targetting ${vars[0]}?\nThis action cannot be undone`;
            case 'resetUserCasesSuccess': return `All logged cases targetting ${vars[0]} were successfully deleted`;
            case 'caseNotFound': return `No cases were found with ID **${vars[0]}**`;
            case 'caseDeletedSuccess': return `Case **${vars[0]}** was successfully deleted`;
            case 'memberleaveActionName': return 'Left members';
            case 'memberleaveEmbedAuthor': return `${vars[0]} left the server`;
            case 'memberleaveEmbedJoinedTitle': return 'Member since';
            case 'memberleaveEmbedJoinedValue': return `<t:${vars[0]}> (<t:${vars[0]}:R>)`;
            case 'memberleaveEmbedMembershipTitle': return 'Passed membership screening';
            case 'memberleaveEmbedMembershipValue': return `\`${vars[0] ? 'no' : 'yes'}\``;
            case 'memberleaveEmbedTimeoutTitle': return 'Timed out until';
            case 'memberleaveEmbedTimeoutValue': return `<t:${vars[0]}> (<t:${vars[0]}:R>)`;
            case 'memberleaveEmbedNickTitle': return 'Nickname';
            case 'memberleaveEmbedBoostTitle': return 'Booster since';
            case 'memberleaveEmbedBoostValue': return `<t:${vars[0]}> (<t:${vars[0]}:R>)`;
            case 'memberleaveEmbedRolesTitle': return 'Roles';
            case 'memberleaveEmbedRolesValue': return `${[...vars[0].first(42).values()]}${(vars[0].size > 42) ? `*+${vars[0].size - 42}*` : ''}`;
            case 'memberjoinEmbedBadgesTitle': return 'Badges';
            case 'cantPruneMessages': return 'You don\'t have permission to prune messages in this channel';
            case 'botCantPruneMessages': return 'I need permission to manage messages in this channel in order to prune them';
            case 'pruneafterSuccess': return `**${vars[0]}** messages were pruned from this channel`;
            case 'pruneafterDescription': return 'Prunes all messages which were sent after a chosen target message';
            case 'pruneEmbedAuthor': return 'Pruned messages';
            case 'pruneEmbedAmountTitle': return 'Amount of messages';
            case 'editionsDescription': return 'Manages the storage of listing of previous versions of edited messages';
            case 'storageSuccess': return `Edited messages storage turned **${vars[0] ? 'on' : 'off'}**`;
            case 'listeditsEmbedAuthor': return 'Message editions';
            case 'listeditsEmbedVersionTitle': return `Version ${vars[0]}`;
            case 'listeditsEmbedVersionValue': return `\`\`\`${(vars[0].slice(0, 1014 - vars[1].toString().length))}\`\`\`<t:${vars[1]}>`;
            case 'listeditsDescription': return 'Lists previous edits of a selected message';
            case 'editionsinfoEmbedAuthor': return 'Editions storage info';
            case 'editionsinfoEmbedDescription': return `Enabled: \`${vars[0] ? 'on' : 'off'}\`\n` +
                                                        `Editions stored: \`${vars[1]}${vars[2] ? '' : '/100'}\``;
            case 'nonPremiumStorage': return 'Non premium servers have a limit of only 100 stored editions\n' +
                                             'To get premium and unlock unlimited storage along with many other amazing features [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'wipeEditionsConfirm': return 'Are you sure you want to delete all stored editions of messages from this server?\n' +
                                               'This action cannot be undone';
            case 'wipeEditionsSuccess': return 'Editions storage was succesffully wiped out';
            case 'noEditsFound': return 'There are no stored previous versions of this message';
            case 'premiumAd0': return 'YottaBot needs your support to keep being fast and reliable while still offering so many free features for everyone\n' +
                                      'Did you know premium servers can **award their members with xp for time spent talking in voice channels**?\n' +
                                      'To unlock this along with [many other amazing features](<https://github.com/HordLawk/YottaBot/wiki/Premium>) ~~and stop getting these ads~~ [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'premiumAd1': return 'YottaBot needs your support to keep being fast and reliable while still offering so many free features for everyone\n' +
                                      'Did you know premium servers can **add unlimited roles for members to achieve by earning xp**?\n' +
                                      'To unlock this along with [many other amazing features](<https://github.com/HordLawk/YottaBot/wiki/Premium>) ~~and stop getting these ads~~ [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'premiumAd2': return 'YottaBot needs your support to keep being fast and reliable while still offering so many free features for everyone\n' +
                                      'Did you know premium servers can **store lists of previous versions of edited messages**?\n' +
                                      'To unlock this along with [many other amazing features](<https://github.com/HordLawk/YottaBot/wiki/Premium>) ~~and stop getting these ads~~ [join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'selectCategory': return 'Select a category';
            case 'helpHome': return 'Home';
            case 'selectCommand': return 'Select a command';
            case 'selectCategoryFirst': return 'Select a category first';
            case 'EmbedHelpCategory1Author': return 'Informational commands';
            case 'EmbedHelpCategory2Author': return 'Administrative commands';
            case 'EmbedHelpCategory3Author': return 'Moderative commands';
            case 'EmbedHelpCategory4Author': return 'Levelling commands';
            case 'EmbedHelpCategory5Author': return 'Miscellaneous commands';
            case 'modalEditSuccess': return 'The reason for this case was succesffully edited';
            case 'modalTimeOut': return 'Modal submission timed out!';
            case 'editReasonModalReasonLabel': return 'Reason';
            case 'editReasonModalTitle': return 'Edit reason';
            case 'editReason': return 'Edit reason';
            case 'setReasonModalTitle': return 'Log reason';
            case 'setReasonModalReasonLabel': return 'Reason';
            case 'optionalInput': return '(optional)';
            case 'filteridsDescription': return 'Reads text from a file or text input and returns the Discord IDs found';
            case 'filteridsModaltextLabel': return 'Unfiltered text';
            case 'fileTooBig': return 'This file is too big for me to filter it';
            case 'invalidFile': return 'Only plain text files are allowed';
            case 'botCantAddSticker': return 'I don\'t have permission to add stickers in this server';
            case 'stickerTooBig': return 'Stickers must have a file size lower than 500 KB';
            case 'lottieNotPartner': return 'Lottie stickers can only be uploaded on guilds that are either partnered or verified';
            case 'newinviteDescription': return 'Generates an invite to the current server with the chosen options';
            case 'botCantCreateInvite': return `I don't have permission to create invites for ${vars[0]}`;
            case 'memberCantCreateInvite': return `You don't have permission to create invites for ${vars[0]}`;
            case 'guildVoiceUnsupported': return 'Commands are not supported in voice channels yet';
            case 'massbanNoValidIds': return 'Targets must include valid user mentions or IDs';
            case 'namebansDescription': return 'Automatically bans users with names that partially or completely match ' +
                                              'chosen text';
            case 'usernameTooLong': return 'The banned piece of text must be shorter than 33 characters in length';
            case 'tooManyNamebans': return `You have reached the limit of ${vars[0]} banned usernames for this server\n` +
                                           `If you wish to upgrade this limit to ${vars[1]} ` +
                                           '[join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'tooManyNamebansPremium': return `You have reached the limit of ${vars[1]} banned usernames for this ` +
                                                  'server';
            case 'namebanAddSuccess': return `\`${vars[0]}\` was successfully added to the list of banned usernames`;
            case 'namebanRemoveSuccess': return `\`${vars[0]}\` was successfully removed from the list of banned usernames`;
            case 'namebanNotFound': return 'The text must be chosen from one of the choices presentedd in the command ' +
                                           'autocomplete';
            case 'disabledExtraNamebans': return 'Since the number of banned usernames exceeded the limit for non ' +
                                                 'premium servers, the latest added usernames over this limite were ' +
                                                 'temporarily disabled\n' +
                                                 'You can make these usernames banned again with premium, to get premium ' +
                                                 '[join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'namebans_listEmbedAuthor': return 'Currently banned usernames';
            case 'namebans_listEmbedDescription': return `Text: \`${vars[0]}\`\n` +
                                                         `Partial: \`${vars[1] ? 'yes' : 'no'}\`\n` +
                                                         `Case sensitive: \`${vars[2] ? 'yes' : 'no'}\``;
            case 'namebanReason': return 'Forbidden username detected';
            case 'idsNotFound': return 'No Discord IDs could be found in the text';
            case 'notarchiveDescription': return 'Define threads that should be automatically unarchived';
            case 'channelIsNotThread': return 'This command can only be used inside a thread channel';
            case 'threadNotArchiveSuccess': return `The archiving status of this thread was set to \`${vars[0]}\``;
            case 'noThreadsWontArchive': return 'There are no threads set to never archive in this server';
            case 'notarchiveEmbedAuthor': return 'Threads set to never archive';
            case 'botCantUnarchive': return 'I need permission to manage this thread';
            case 'threadUnarchiveReason': return 'Thread was set to be automatically unarchived';
            case 'tooManyAutoUnarchives': return `You have reached the limit of ${vars[0]} automatically unarchied ` +
                                                 'threads for this server\n' +
                                                 `If you wish to upgrade this limit to ${vars[1]} ` +
                                                 '[join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'tooManyAutoUnarchivesPremium': return `You have reached the limit of ${vars[0]} automatically ` +
                                                        'unarchived threads for this server';
            case 'disabledExtraNotArchiveds': return 'Since the number of automatically unarchived threads exceeded ' +
                                                     'the limit for non premium servers, the latest added threads ' +
                                                     'over this limite were temporarily disabled\n' +
                                                     'You can make these threads automatically unarchived again with ' +
                                                     'premium, to get premium ' +
                                                     '[join Patreon](<https://www.patreon.com/YottaBot>)';
            case 'welcomeMessage': return `[**${vars[0]}**](<https://discord.com/users/${vars[1]}>) just joined!\n` +
                                          `Please welcome them to the server`;
            case 'newWelcomeHookReason': return 'Created to welcome new members';
            case 'WelcomeOldHookDeletedReason': return 'Old unused welcome webhook';
            case 'welcomEnableSuccess': return `Welcome messages successfully enabled in ${vars[0]}`;
            case 'welcomeDisableSuccess': return 'Welcome messages succesfully disabled';
            case 'userInfoTitle': return 'User Info';
            case 'userInfoUsername': return 'Username';
            case 'userInfoNickname': return 'Nickname';
            case 'userInfoCreatedAt': return 'Account created at';
            case 'userInfoJoinedAt': return 'Joined the server at';
            case 'userInfoRoles': return 'Roles';
            case 'userInfoDescription': return 'Shows info on an user';
            case 'userinfoUsage': return '[(user)]';
            case 'timeAmountDays': return `${vars[0]} days`;
            case 'timeAmountHours': return `${vars[0]} hours`;
            case 'timeAmountMinutes': return `${vars[0]} minutes`;
            case 'timeAmountSeconds': return `${vars[0]} seconds`;
            case 'slowmodeDisable': return 'Disable';
            case 'lockDescription': return 'Stops new messages from being sent in the current channel';
            case 'lockUsage': return '[<on/off>]';
            case 'botCantLock': return 'I don\'t have permission to manage this channel\'s permissions';
            case 'lockAuditReason': return `Channel ${vars[0] ? 'un' : ''}locked by ${vars[1]}`;
            case 'lockSuccess': return `Channel successfully ${vars[0] ? 'un' : ''}locked`;
            case 'lockignoreDescription': return 'Sets roles that will be ignored by the lock command';
            case 'lockignoreSuccess': return `The role ${vars[0]} will be successfully ignored by the lock command`;
            case 'botCantManageRole': return 'I don\'t have permission to manage this role';
            case 'lockignoreTooManyRoles': return (
                'You reached the limit of roles ignored by the lock command for this server\n' +
                'Note that this limit is 10 roles for premium servers and 1 role for non premium servers'
            );
            case 'lockignoreRemoveSuccess': return `The role ${vars[0]} will be no longer ignored by the lock command`;
            case 'lockignore_listEmbedAuthor': return 'Roles currently ignored by the lock command';
            case 'voiceconnectActionName': return 'Voice connections';
            case 'voicedisconnectActionName': return 'Voice disconnections';
            case 'voicemoveActionName': return 'Voice moves';
            case 'voiceconnectEmbedAuthor': return `${vars[0]} connected to a voice channel`;
            case 'voiceconnectEmbedUserTitle': return 'User';
            case 'voiceconnectEmbedChannelTitle': return 'Channel';
            case 'voicedisconnectEmbedAuthor': return `${vars[0]} disconnected from a voice channel`;
            case 'voicedisconnectEmbedUserTitle': return 'User';
            case 'voicedisconnectEmbedChannelTitle': return 'Channel';
            case 'voicedisconnectEmbedExecutorTitle': return 'Executor';
            case 'voicemoveEmbedAuthor': return `${vars[0]} moved between voice channels`;
            case 'voicemoveEmbedFromTitle': return 'From channel';
            case 'voicemoveEmbedToTitle': return 'To channel';
            case 'voicemoveEmbedTargetTitle': return 'Target';
            case 'voicemoveEmbedExecutorTitle': return 'Executor';
            case 'voicemoveEmbedUserTitle': return 'User';
            case 'lockignoreNoRolesToList': return 'There are no roles ignored by the lock command in this server';
            case 'configsTrackInvitesSuccess': return `Invite tracking turned **${vars[0] ? 'on' : 'off'}**`;
            case 'memberjoinEmbedInviteTitle': return 'Invite used';
            case 'configsTrackInvitesCantManageGuild': return 'I need Manage Guild permission to track invites';
            case 'configsInviteTrackerJoinlogDisabled': return 'You need to have enable joined members logs first';
            case 'configsTrackInvitesNotPremium': return (
                'This is a premium only feature, to get premium for your server ' +
                '[join Patreon](<https://www.patreon.com/YottaBot>)'
            );
            case 'memberjoinEmbedInviteValue': return (
                `Code: [\`${vars[0]}\`](https://discord.gg/${vars[0]})\n` +
                `Inviter: ${vars[1]} \`${vars[1].tag}\``
            );
            case 'invArgsSlash': return (
                `Invalid arguments!\n` +
                `Click a command below for the correct usage:\n` +
                vars.usages
            );
            case 'userInfoBadges': return 'Badges';
            case 'noRankedMembers': return (
                'It looks like there aren\'t any members with xp in this server yet\n' +
                'Go talk for a bit and be the first to earn some!'
            );
            case 'noBannedUsernames': return 'There are no banned usernames in this server';
        }
    },
};