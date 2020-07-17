const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "unban",
    description: "Unban a member.",
    usage: "<user>",
    category: "moderation",
    aliases: ['ub'],
    guildOnly: true,

    async code(client, message, args, isTest) {
        return message.channel.send(`Not made.`);
    }
}