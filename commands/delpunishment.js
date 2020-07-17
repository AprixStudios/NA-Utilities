const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "delpunishment",
    description: "Delete a punishment record from a member.",
    usage: "<member> <bans | mutes | kicks> <id>",
    category: "moderation",
    aliases: ['delpunish', 'unpunish'],
    guildOnly: true,

    async code(client, message, args, isTest) {
        return message.channel.send(`Not made.`);
    }
}