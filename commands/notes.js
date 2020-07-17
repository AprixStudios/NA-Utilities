const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser,getPages,setCleanTitle,setCleanFooter} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "notes",
    description: "Display the notes of a member.",
    usage: "<member>",
    category: "moderation",
    aliases: [],
    guildOnly: true,

    async code(client, message, args, isTest) {
        if (!message.member.hasPermission("MANAGE_MESSAGES") && isTest === false) return message.channel.send(`No. Missing Permissions: ${message.member.hasPermission("MANAGE_MESSAGES") ? "" : "Manage Messages"}`);
        if (args.length === 0) {
            let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nMember is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
            return message.channel.send(embed);
        }
        var user = await getUser(args[0], client);
        if (!user) {
            let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nMember is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
            return message.channel.send(embed);
        }
        if (user === message.author) return message.channel.send(`This is for your own health... Stop.`);
        var member = client.guilds.cache.get('713446315496964176').member(user);
        await args.shift();
        var page = parseInt(args[0]);
        if (!page) page = 1;
        getDB(member.user.id).then(async res => {
            if (!res) {
                let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis member doesn't have any notes.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                return message.channel.send(embed);
            }
            if (!res.punishments.notes[0]) {
                let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis member doesn't have any notes.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                return message.channel.send(embed);
            }

            var items = await getPages(res.punishments.notes,page);
            var notesArr = [];
            for (let item of items.pages) {
                notesArr.push(`ID: ${res.punishments.notes.indexOf(item)}\nModerator: ${item.modTag}\nNote: ${item.note}`);
            }

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            setCleanTitle(message,embed,`Notes`);
            embed.description(notesArr.join(`\n\n`));
            setCleanFooter(message,embed,`Page: ${items.amount}`);

            message.channel.send(embed);
        });
    }
}