const {MessageEmbed} = require('discord.js');
const {getDB,createDB,saveDB,getUser} = require('../functions/functions.js');
const {prefix} = require('../config.json');
const {writeJson} = require('fs-extra');

module.exports = {
    name: "note",
    description: "Add a note to a member.",
    usage: "<member> <note>",
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
        var note = args.slice(0).join(' ');
        if (!note) {
            let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nNote is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
            return message.channel.send(embed);
        }
        getDB(member.user.id).then(async res => {
            if (!res) res = await createDB(member.id);
            res.punishments.notes.push({
                moderator: message.author.id,
                modTag: message.author.tag,
                note: note,
                happenedAt: Date.now()
            });
            saveDB(res).then(() => {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Note Added`)
                .addField(`Member`, `${member.user.tag} (${member.user.id})`)
                .addField(`Note`, `${note}`)
            
                message.channel.send(embed).catch(err => err);
            });
        });
    }
}