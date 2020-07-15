const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: "all"});
const { prefix, token, dbpass, webhookSecret} = require('./config.json');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const gad = require('git-auto-deploy');
const express = require('express');
const app = express();

app.listen(9000, () => console.log(`Webhook running!`));

app.get('/aprixia/na-utilities/webhook', (req,res) => {
    if (req.query.secret === webhookSecret) {
        gad.deploy();
    } else {
        res.send(`no`);
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


client.on('ready', () => {console.log(`Ready!`);});

client.login(token);