require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Beep Bop Bot is ready.')
});

client.on('message', msg => {
    if(msg.content == 'galaxy brain') {
	const galaxyBrain = new Discord.MessageAttachment('media/galaxyBrain.jpg');
	msg.channel.send(galaxyBrain);
    }else if(message.content == 'blaze it!') {
	const blazeIt = new Discord.MessageAttachment('media/snoopDog.jpg');
	msg.channel.send(blazeIt);
    }
});

client.login(process.env.BOTTOKEN);
