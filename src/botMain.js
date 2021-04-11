require('dotenv').config();

const Discord  = require('discord.js');
const client = new Discord.Client();
const PREFIX = "!";


client.login(process.env.DISCORD_BOT_TOKEN); 

client.on('ready', () => {
   console.log(` Beep boop, ${client.user.tag} has logged on!`)
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

   /*placeholder for setAlarm command*/
   if (msg.content.startsWith('!setAlarm')){ 
      return;
   /*responding with memes*/
   } else if(msg.content == 'galaxy brain' || (isNumber(CMD) && CMD >= 200 && args[0].toUpperCase() === "IQ") ) {
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
     
      if (cmd === 'alarm') {
         /*put alarm code here*/
         msg.channel.send('placeholder for alarm code');  
      } else if (cmd === 'timer') {
         /*put timer code here*/
         msg.channel.send('placeholder for timer code');
      }
      console.log(cmd);
      console.log(args);

   }





   /*logging all user messages*/
   console.log(`[${msg.author.tag}]: ${msg.content}`);

   /*example code greeting user*/
   if(msg.content === 'hello') {
      msg.channel.send('hello')
   } 
});

/*
client.on('message', msg => {
   let message = msg.content;
   //let startsWithTriggerChar = message.startsWith("!", 0);

   if(msg.content == 'galaxy brain') {
      const galaxyBrain = new Client.MessageAttachment('media/galaxyBrain.jpg');
      msg.channel.send(galaxyBrain);
   } else if(msg.content == 'blaze it!') {
      const blazeIt = new Client.MessageAttachment('media/snoopDog.jpg');
      msg.channel.send(blazeIt);
   } else if (msg.content == 'stonks') {
      const stonksImg = new Client.MessageAttachment('media/gooseStonks.jpg');
      msg.channel.send(stonksImg);
   } else {
   
   }
   if (startsWithTiggerChar) {
      const stonksImg = new Discord.MessageAttachment('media/gooseStonks.jpg');
      msg.channel.send(stonksImg);
   }

});
*/

client.login(process.env.BOTTOKEN);

