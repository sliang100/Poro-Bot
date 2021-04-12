//load all required packages
require('dotenv').config();

const Discord = require('discord.js');
const { Agenda } = require('agenda');
const client = new Discord.Client();
const PREFIX = "!";
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
   console.log(` Beep boop, ${client.user.tag} has logged on and is ready!`);
});

/*returns True is parameter is a number, False otherwise*/
function isNumber(num) {
   return !isNaN(num);
}

/*generates random integer betweeen max and min parameter values*/
function getRandomInt(min, max) {
   return Math.floor(Math.random() * max + min);
}

/*block for bot to respond to messages*/
client.on('message', (msg) => {
   if (msg.author.bot) {
      return;
   }
   /*commands without trigger character*/
   const [CMD, ...args] = msg.content
      .trim()
      .split(/\s+/);
   const leagueModesList = ['5v5', 'rift', 'aram', 'urf', 'ofa', 'blitz'];

   if(msg.content == 'galaxy brain' || (isNumber(CMD) && CMD >= 200 && args[0].toUpperCase() === "IQ") ) {
      let seed = getRandomInt(1, 3);
      let galaxyBrain;

      /*determining random galaxy brain image to send*/
      switch (seed) {
         case 1:
            galaxyBrain = new Discord.MessageAttachment('media/galaxyBrainImgs/galaxyBrain1.jpg');
            break;
         case 2:
            galaxyBrain = new Discord.MessageAttachment('media/galaxyBrainImgs/galaxyBrain2.jpg');
            break;
         case 3:
            galaxyBrain = new Discord.MessageAttachment('media/galaxyBrainImgs/galaxyBrain3.jpg');
            break;
      }      
      msg.channel.send(galaxyBrain);
   } else if(msg.content === 'blaze it!' || msg.content === 'snoop dog') {
      const blazeIt = new Discord.MessageAttachment('media/snoopDog.jpg');
      msg.channel.send(blazeIt);
   } else if (msg.content === 'stonks') {
      const stonksImg = new Discord.MessageAttachment('media/gooseStonks.jpg');
      msg.channel.send(stonksImg);
      /*league functionality*/
   } else if (leagueModesList.includes(CMD)) {
      let mode = CMD;
      let champion = args[0];

      if (mode === 'rift') {
         mode = '5v5'
      }

      let link = "https://www.metasrc.com/" + mode + "/champion/" + champion;
      msg.channel.send(link);
   } else if (msg.content.startsWith(PREFIX)) {
      //split up given string by white-space to parse out command and arguments
      const [cmd, ...args] = msg.content.
         trim()
         .substring(PREFIX.length)
         .split(/\s+/);

      if (cmd === 'alarm' || cmd === 'setAlarm') {
         /*put alarm code here*/
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

         i++;

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

      } else if (cmd === 'timer') {
         /*put timer code here*/
         msg.channel.send('placeholder for timer code');
      }
   }

   /*logging all user messages*/
   console.log(`[${msg.author.tag}]: ${msg.content}`);
  });
 
//discord bot token
client.login(process.env.BOTTOKEN);
