const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "unmute",
    description: "Unmute a member.",
    usage: "<member> [reason]",
    category: "moderation",
    aliases: ['um', 'unsilence', 'us'],
    guildOnly: true,

    async code(client, message, args, isTest) {
        return message.channel.send(`Not made.`);
    }
}