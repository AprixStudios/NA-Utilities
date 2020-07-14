const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: "all"});
const { prefix, token, dbpass } = require('./config.json');
const fs = require('fs-extra');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://AltriDBs:${dbpass}@altricatiadb-u2sqy.mongodb.net/nautils?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('Database Connected...'))
.catch(err => console.log(err));


client.on('ready', () => {console.log(`Ready!`);});

client.login(token);