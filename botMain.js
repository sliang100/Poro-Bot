require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Beep Bop Bot is ready.')
});

client.on('message', msg => {
    if(msg.content == 'galaxy brain') {
	const galaxyBrain = new Discord.MessageAttachment('galaxyBrain.jpg');
	msg.channel.send(galaxyBrain);
    }
});

client.login(process.env.BOTTOKEN);
