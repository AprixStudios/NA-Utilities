const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "delnote",
    description: "Delete a note from a member.",
    usage: "<member> <id>",
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
        var noteArg = parseInt(args[0]);
        if (!noteArg) {
            let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nNote is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
            return message.channel.send(embed);
        }
        var note = Math.ceil(noteArg)-1;
        getDB(member.user.id).then(async res => {
            if (!res) {
                let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis member doesn't have any notes.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                return message.channel.send(embed);
            }
            if (!res.punishments.notes[note]) {
                let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nInvalid note id.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                return message.channel.send(embed);
            }
            let removedNote = res.punishments.notes.splice(note,1);
            saveDB(res).then(() => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Note Removed`)
                .addField(`Member`, `${member.user.tag} (${member.user.id})`)
                .addField(`Note`, `${removedNote[0].note}`)
            
                message.channel.send(embed).catch(err => err);
            });
        });
    }
}