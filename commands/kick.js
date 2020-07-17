const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "kick",
    description: "Kick a member.",
    usage: "<member> <reason>",
    category: "moderation",
    aliases: ['k'],
    guildOnly: true,

    async code(client, message, args, isTest) {
        return message.channel.send(`Not made.`);
    }
}