const {MessageEmbed} = require('discord.js');
const {setCleanTitle} = require('../functions/functions.js');
const {prefix} = require('../config.json');

module.exports = {
    name: "slowmode",
    description: "Set the slowmode for the channel with optional reason.",
    usage: "<delay> [reason]",
    category: "moderation",
    aliases: [],
    guildOnly: true,

    async code(client, message, args, isTest) {
        if (!message.member.hasPermission("MANAGE_MESSAGES") && isTest === false) return message.channel.send(`No. Missing Permissions: ${message.member.hasPermission("MANAGE_MESSAGES") ? "" : "Manage Messages"}`);
        var delay = parseInt(args[0]);
        if (!delay) {
            let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nDelay is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
            return message.channel.send(embed);
        }
        if (isNaN(delay)) delay = 0;
        if (args.length !== 0 && ['-c','-clean'].includes(args[-1].toLowerCase())) args.pop();
        var reason = args.slice(0).join(' ');

        let embed = new MessageEmbed()
        .setColor("RANDOM")
        setCleanTitle(message,embed,`Slowmode`);
        embed.setDescription(`Slowmode has now been ${delay !== 0 ? `set to ${delay}` : `been turned off`} by ${message.author.tag}${reason ? `\nWith reason: ${reason}` : `\nWithout a set reason.`}`);

        message.channel.setRateLimitPerUser(delay, `Moderator: ${message.author.tag} (${message.author.id}) | Reason: ${reason ? reason : "No Reason"}`).then(() => {
            message.channel.send(embed);
        }).catch(err => {
            let errbed = new MessageEmbed().setColor("RANDOM").setTitle(`TypeError/CodeError\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\n${err.message}`).addField(`Usage`, prefix+this.name+' '+this.usage)
            return message.channel.send(errbed);
        });

    }
}