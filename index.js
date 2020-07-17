const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: "everyone"});
const { prefix, token, dbpass, webhookSecret} = require('./config.json');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const gad = require('git-auto-deploy');
const express = require('express');
const app = express();

app.listen(9000, () => console.log(`Webhook running!`));

app.post('/aprixia/na-utilities/webhook', (req,res) => {
    if (req.query.secret === webhookSecret) {
        gad.deploy();
    }
});

mongoose.connect(`mongodb+srv://AltriDBs:${dbpass}@altricatiadb-u2sqy.mongodb.net/nautils?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('Database Connected...'))
.catch(err => console.log(err));

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`));

for (const file of commandFiles) {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName.toLowerCase()));

    if (!command) return;
    
    if (command.guildOnly && message.channel.type === "dm") return;

    try {
        command.code(client, message, args, false);
    } catch (error) {
        console.error(error);
    }
});

client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    let args = message.content.slice(prefix.length).split(/ +/);
    console.log('in')
    let tagName = args.shift();
    let {tags} = require('./tags.json');
    let tag = tags[tagName.toLowerCase()];
    if (!tag) return;
    let embed;
    switch(tagName.toLowerCase()) {
        case "rule":
            console.log('isrule')
            let rule = args.shift();
            if (!rule || !tag[rule]) rule = "1";
            let section = args.shift();
            if (!section || !tag[rule][section]) section = "all";
            let ruleTag = tag[rule];
            embed = new Discord.MessageEmbed()
            .setColor(ruleTag.color)
            if (!message.content.toLowerCase().endsWith('-c') && !message.content.toLowerCase().endsWith('-clean')) embed.setTitle(`${tagName}`)
            embed.setDescription(`${ruleTag.value}\n    ${ruleTag[section]}`)

            message.channel.send(embed).then(msg => {
                if (message.mentions.users.first()) msg.edit(`${message.mentions.users.first()}`);
            });
        break;
        default:
            console.log('is other')
            embed = new Discord.MessageEmbed()
            .setColor(tag.color)
            if (!message.content.toLowerCase().endsWith('-c') && !message.content.toLowerCase().endsWith('-clean')) embed.setTitle(`${tagName}`)
            embed.setDescription(`${tag.value}`)

            message.channel.send(embed).then(msg => {
                if (message.mentions.users.first()) msg.edit(`${message.mentions.users.first()}`);
            });
    }
});


client.on('ready', () => {console.log(`Ready!`);});

client.login(token);
