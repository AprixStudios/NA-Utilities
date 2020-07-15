const {MessageEmbed} = require('discord.js');
const {prefix} = require('../config.json');

module.exports = {
    name: "say",
    description: "Make the bot send a message.",
    usage: "<message>",
    category: "fun",
    aliases: ['echo', 'send'],

    code(client, message, args, isTest) {
        if (!args) return message.channel.send(new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}`).addField(`Usage`, prefix+this.name+' '+this.usage));
        message.channel.send(`${args.join(' ')}`);
    }
}