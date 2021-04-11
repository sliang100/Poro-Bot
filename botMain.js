//load all required packages
require('dotenv').config();

const Discord = require('discord.js');
const { Agenda } = require('agenda');
const client = new Discord.Client();
const mongoConnectionString = 'mongodb://127.0.0.1:27017/AgendaMedium';
//start agenda instance
const agenda = new Agenda({
    db: {address: mongoConnectionString, collection: 'Agenda'},
    processEvery: '20 seconds',
    useUnifiedTopology: true
});

//define agenda job
agenda.define("alarm1", (job) => {
    client.channels.cache.get(job.attrs.data.channelID).send('alarm');
});

//start agenda
agenda.start();

//start discord bot
client.on('ready', () => {
    console.log('Beep Bop Bot is ready.');
});

//read messages in channel
client.on('message', msg => {
//trigger words
    if(msg.content == 'galaxy brain') {
       const galaxyBrain = new Discord.MessageAttachment('media/galaxyBrain.jpg');
       msg.channel.send(galaxyBrain);
    } else if(msg.content == 'blaze it!') {
       const blazeIt = new Discord.MessageAttachment('media/snoopDog.jpg');
       msg.channel.send(blazeIt);
    } else if (msg.content == 'stonks') {
       const stonksImg = new Discord.MessageAttachment('media/gooseStonks.jpg');
       msg.channel.send(stonksImg);
//commands
    } else if (msg.content.startsWith('!setAlarm')){
	let msgChanID = msg.channel.id;
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

	    let alarmTime = new Date();
	    alarmTime.setDate(parseInt(day));
	    alarmTime.setMonth(parseInt(month) - 1);
	    alarmTime.setFullYear(parseInt(year));
	    alarmTime.setHours(parseInt(hour));
	    alarmTime.setMinutes(parseInt(minute));
	    agenda.schedule(alarmTime, "alarm1", { channelID: msgChanID });
	} else if(year == '' ) {
	    //set year to current year
	    let now = new Date();
	    let yearInt = now.getFullYear();

	    year = yearInt.toString();

	    let alarmTime = new Date();
	    alarmTime.setDate(parseInt(day));
	    alarmTime.setMonth(parseInt(month) - 1);
	    alarmTime.setFullYear(parseInt(year));
	    alarmTime.setHours(parseInt(hour));
	    alarmTime.setMinutes(parseInt(minute));
	    agenda.schedule(alarmTime, "alarm1", { channelID: msgChanID });
	} else {
	    let alarmTime = new Date();
	    alarmTime.setDate(parseInt(day));
	    alarmTime.setMonth(parseInt(month) - 1);
	    alarmTime.setFullYear(parseInt(year));
	    alarmTime.setHours(parseInt(hour));
	    alarmTime.setMinutes(parseInt(minute));
	    //run with all user data
	    agenda.schedule(alarmTime, "alarm1", { channelID: msgChanID });
	}
    } else {
	//do nothing
    }
});

//discord bot token
client.login(process.env.BOTTOKEN);
