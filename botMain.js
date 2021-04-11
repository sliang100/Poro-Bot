require('dotenv').config();

const Discord = require('discord.js');
const Agenda = require('agenda');
const client = new Discord.Client();
const mongoConnectionString = 'mongodb://127.0.0.1:27017/AgendaMedium';
const agenda = new Agenda({
    db: {address: mongoConnectionString, collection: 'Agenda'},
    processEvery: '20 seconds',
    useUnifiedTopology: true
});

client.on('ready', () => {
    console.log('Beep Bop Bot is ready.');
});

client.on('message', msg => {
    if(msg.content == 'galaxy brain') {
       const galaxyBrain = new Discord.MessageAttachment('media/galaxyBrain.jpg');
       msg.channel.send(galaxyBrain);
    } else if(msg.content == 'blaze it!') {
       const blazeIt = new Discord.MessageAttachment('media/snoopDog.jpg');
       msg.channel.send(blazeIt);
    } else if (msg.content == 'stonks') {
       const stonksImg = new Discord.MessageAttachment('media/gooseStonks.jpg');
       msg.channel.send(stonksImg);
    } else if (msg.content.startsWith('!setAlarm')){
	let commandStr = msg.content;
	//command format: !setAlarm [hour]:[minute] [month]/[day]/[year]
	let timeStr = commandStr.substring(10);

	let i = 0;
	let month = '', day = '', year = '', hour = '', minute = '';

	while(timeStr.charAt(i) != ':' && i < timeStr.length) {
	    hour = hour + timeStr.charAt(i);
	    i++;
	}
	i++;

	while(timeStr.charAt(i) != ' ' && i < timeStr.length) {
	    minute = minute + timeStr.charAt(i);
	    i++;
	}
	i++;

	while(timeStr.charAt(i) != '/' && i < timeStr.length) {
	    month = month + timeStr.charAt(i);
	    i++;
	}
	i++;

	while(timeStr.charAt(i) != '/' && i < timeStr.length) {
	    day = day + timeStr.charAt(i);
	    i++;
	}
	i++

	while(i < timeStr.length) {
	    year = year + timeStr.charAt(i);
	    i++;
	}

	if(hour == '' || minute == '') {
	    console.error('insufficent time data');
	} else if(month == '' || day == '') {
	    //set day, month, and year to current day, month, and year
	    let now = new Date();
	    let monthInt = now.getMonth() + 1;
	    let dayInt = now.getDate();
	    let yearInt = now.getFullYear();
	    
	    month = monthInt.toString();
	    day = dayInt.toString();
	    year = yearInt.toString();
	} else if(year == '' ) {
	    //set year to current year
	    let now = new Date();
	    let yearInt = now.getFullYear();

	    year = yearInt.toString();
	} else {
	    //run with all user data
	}
    } else {
	//do nothing
    }
});

client.login(process.env.BOTTOKEN);
