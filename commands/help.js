const {MessageEmbed} = require('discord.js');
const {prefix} = require('../config.json');

module.exports = {
    name: "help",
    description: "A command list.",
    aliases: ["commands", "cmds"],
    usage: "[command]",
    category: "information",
    
    async code(client, message, args, isTest) {
        var argCmd = args[0];
        if (argCmd) argCmd = argCmd.toLowerCase();
        let command = client.commands.get(argCmd) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(argCmd));
        if (!command) {
            var commands = {
                moderation: [],
                information: [],
                fun: [],
                roles: [],
                developer: []
            };
            client.commands.map(cmd => cmd).forEach(cmd => {
                commands[cmd.category].push(cmd.name);
            });
            for (const category of Object.entries(commands)) {
                if (category[1].length === 0) category[1].push(`None`);
            }
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Help")
            .setDescription(`<> = required | [] = optional\n${prefix}${this.name} ${this.usage}`)
            .addField(`Moderation`, commands.moderation.join(', '), true)
            .addField(`Information`, commands.information.join(', '), true)
            .addField(`Fun`, commands.fun.join(', '), true)
            .addField(`Roles`, commands.roles.join(', '), true)
            .addField(`Developer`, commands.developer.join(', '), true)

            return message.channel.send(embed).catch(err => err);


        } else if (command) {
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(command.name.slice(0,1).toUpperCase() + command.name.slice(1))
            .setDescription(`${command.description}\n<> = required | [] = optional`)
            .addField(`Usage`, prefix+command.name+' '+command.usage, true)
            .addField(`Category`, command.category.slice(0,1).toUpperCase()+command.category.slice(1), true)
            .addField(`Aliases`, `${command.aliases.length > 0 ? command.aliases.join(', ') : "None" }`)

            return message.channel.send(embed).catch(err => err);

        }
    }
}