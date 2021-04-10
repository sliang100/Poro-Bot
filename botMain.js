require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Beep Bop Bot is ready')
});

client.login(process.env.BOTTOKEN);
