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


client.once('ready', () => {
    console.log(`Ready!`);
    var {getDB,saveDB,getTime} = require('./functions/functions.js');
    var cases = require('./cases.json');
    var guild = client.guilds.cache.get('713446315496964176');
    var modLogs = guild.channels.cache.get('733346228146012190');
    async function unban() {
        guild.fetchBans().then(bans => {
            bans.forEach(ban => {
                getDB(user.id).then(res => {
                    if (!res) return;
                    if (res.punishments.bans.length === 0) return;
                    if (res.punishments.bans[res.punishments.bans.length-1].time > Date.now()) return;
                    let banItem = res.punishments.bans[res.punishments.bans.length-1];
                    cases++;
                    fs.writeJson(`./cases.json`, cases);
                    guild.unban(user.id).then(() => {
                        let embed = Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Member Unbanned #${cases}`)
                        .addField(`Member`, `${ban.user.tag} (${ban.user.id})`, true)
                        .addField(`Moderator`, `${banItem.modTag} (${banItem.moderator})`, true)
                        .addField(`Reason for ban`, `${banItem.reason}`)
                        .setFooter(`This ban lasted for ${getTime(Date.now()-res.punishments.bans[res.punishments.bans.length-1].happenedAt)}`)

                        modLogs.send(embed).catch(() => {
                            console.error(error);
                        });
                    }).catch(console.error);
                });
            });
        });
    }
    async function unmute() {
        let mutedMembers = guild.members.cache.map(members => members).filter(member => member.roles.cache.has('724549953942323221'));
        mutedMembers.forEach(member => {
            getDB(member.user.id).then(res => {
                if (!res) return;
                if (res.punishments.mutes.length === 0) return;
                if (res.punishments.mutes[res.punishments.mutes.length-1].time > Date.now()) return;
                let muteItem = res.punishments.mutes[res.punishments.mutes.length-1];
                cases++;
                fs.writeJson(`./cases.json`, cases);
                member.roles.remove('724549953942323221').then(() => {
                    let embed = Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Member Unmuted #${cases}`)
                    .addField(`Member`, `${member.user.tag} (${member.user.id})`, true)
                    .addField(`Moderator`, `${muteItem.modTag} (${muteItem.moderator})`, true)
                    .addField(`Reason for ban`, `${muteItem.reason}`)
                    .setFooter(`This ban lasted for ${getTime(Date.now()-res.punishments.mutes[res.punishments.mutes.length-1].happenedAt)}`)

                    modLogs.send(embed).catch(() => {
                        console.error(error);
                    });
                }).catch(console.error);
            });
        });
    }
    setInterval(() => {
        unban().catch(console.error);
        unmute().catch(console.error);
    }, 60000);
});

client.login(token);
