const {MessageEmbed} = require('discord.js');
const {getDB,createDB,getTime,setTime,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "mute",
    description: "Mute a member.",
    usage: "<member> [time] <reason>",
    category: "moderation",
    aliases: ['m', 'silence', 's'],
    guildOnly: true,

    async code(client, message, args, isTest) {
        return message.channel.send(`Not made.`);
    }
}