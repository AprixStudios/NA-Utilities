const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "punishments",
    description: "Display the punishments of a member.",
    usage: "<member> [bans | mutes | kicks]",
    category: "moderation",
    aliases: ['records', 'infractions'],
    guildOnly: true,

    async code(client, message, args, isTest) {
        return message.channel.send(`Not made.`);
    }
}