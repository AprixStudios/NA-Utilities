const {MessageEmbed} = require('discord.js');
const {writeJson, write} = require('fs-extra');
const tagJson = require('../tags.json');
const {prefix} = require('../config.json');

module.exports = {
    name: "tag",
    aliases: ["tags"],
    description: "Create, delete, modify, or display a tag.",
    category: "information",
    usage: "create <name> <text> | delete <name> | modify <name> <value | color> <value> | display <name> | list",

    code(client, message, args, isTest) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`No. Missing permissions: ${message.member.hasPermission("MANAGE_MESSAGES") ? "" : "Manage Messages"}`)
        var doing = args.shift();
        if (!doing) {
            let embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nAction is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
            return message.channel.send(embed);
        }
        let name;
        let value;
        let oldValue;
        let embed;
        switch(doing.toLowerCase()) {
            case "create":
                name = args.shift();
                if (!name) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nName is not defined or name is invalid.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                if (tagJson.tags[name.toLowerCase()]) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Sanity Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis tag already exist.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                value = args.join(' ');
                if (!value) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nValue is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                tagJson.tags[name.toLowerCase()] = {
                    value: value,
                    color: "RANDOM"
                }
                writeJson(`./tags.json`, tagJson);

                embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Tags | ${name}`)
                .setDescription(`Successfully created the tag with name ${name} and value:\n${value}`)

                message.channel.send(embed);
                break;
            case "delete":
                name = args.shift();
                if (!name) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nName is not defined or name is invalid.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                if (!tagJson.tags[name.toLowerCase()]) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Sanity Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis tag doesn't exist.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                value = tagJson.tags[name.toLowerCase()].value;
                delete tagJson.tags[name.toLowerCase()];
                writeJson(`./tags.json`, tagJson);

                embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Tags | ${name}`)
                .setDescription(`Successfully deleted the tag with name ${name} and value:\n${value}`)

                message.channel.send(embed);
                break;
            case "modify":
                name = args.shift();
                if (!name) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nName is not defined or name is invalid.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                if (!tagJson.tags[name.toLowerCase()]) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Sanity Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis tag doesn't exist.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                let item = args.shift();
                if (!item) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nItem is not defined.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                switch(item.toLowerCase()) {
                    case "value":
                        oldValue = tagJson.tags[name.toLowerCase()].value;
                        value = args.join(' ');
                        tagJson.tags[name.toLowerCase()].value = value;
                        writeJson(`./tags.json`, tagJson);
                        embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Tags | ${name}`)
                        .setDescription(`Successfully modified the tag with name ${name} and value:\n${value}\nFrom\n${oldValue}`)

                        message.channel.send(embed);
                        break;
                    case "color":
                        oldValue = tagJson.tags[name.toLowerCase()].color;
                        value = args[0];
                        if (!value || value.toLowerCase() === "random" || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].some(letter => !value.toLowerCase().indexOf(letter) >= 0) || value.length !== 6) value = "RANDOM";
                        tagJson.tags[name.toLowerCase()].color = value;
                        writeJson(`./tags.json`, tagJson);
                        embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Tags | ${name}`)
                        .setDescription(`Successfully modified the tag with name ${name} and color:\n${value}\nFrom\n${oldValue}`)

                        message.channel.send(embed);
                        break;
                    default:
                        embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis isn't a method.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                        return message.channel.send(embed);

                }
                break;
            case "display":
                name = args.shift();
                if (!name) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nName is not defined or name is invalid.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                if (!tagJson.tags[name.toLowerCase()]) {
                    embed = new MessageEmbed().setColor("RANDOM").setTitle(`Sanity Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis tag doesn't exist.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                    return message.channel.send(embed);
                }
                let tag = tagJson.tags[name.toLowerCase()];
                embed = new MessageEmbed()
                .setColor(tag.color)
                if (!message.content.toLowerCase().endsWith('-c') && !message.content.toLowerCase().endsWith('-clean')) embed.setTitle(`${name}`)
                embed.setDescription(`${tag.value}`)

                message.channel.send(embed).then(msg => {
                    if (message.mentions.users.first()) msg.edit(`${message.mentions.users.first()}${embed}`);
                });
                break;
            case "list":
                let tags = Object.keys(tagJson.tags);
                embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Tags")
                .setDescription(`\`${tags.join('` `')}\``)

                message.channel.send(embed);
                break;
            default:
                embed = new MessageEmbed().setColor("RANDOM").setTitle(`Syntax Error\n${this.name.slice(0,1).toUpperCase()+this.name.slice(1)}`).setDescription(`${this.description}\n\nThis isn't a method.`).addField(`Usage`, prefix+this.name+' '+this.usage)
                return message.channel.send(embed);
        }
    }
}