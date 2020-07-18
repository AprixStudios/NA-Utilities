const {MessageEmbed} = require('discord.js');
const {prefix} = require('../config.json');

module.exports = {
    name: "say",
    description: "Make the bot send a message.",
    usage: "<message>",
    category: "fun",
    aliases: ['echo', 'send'],
    blocked: [],

    code(client, message, args, isTest) {
        if (this.blocked.includes(message.author.id)) return;
        if (!args[0]) {
            let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}`).addField(`Usage`, prefix+this.name+' '+this.usage);
            return message.channel.send(embed);
        }
        message.channel.send(`${args.join(' ')}`).then(msg => {
            setTimeout(() => {
                if (message.deleted) return msg.delete();
                setTimeout(() => {
                    if (message.deleted) return msg.delete();
                    setTimeout(() => {
                        if (message.deleted) return msg.delete();
                    }, 5000);
                }, 5000);
            }, 5000);
        });
    }
}
