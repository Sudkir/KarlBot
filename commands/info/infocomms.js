//команды выводящие информацию 

//подключение файлов
const config = require('../../config.json');
const Discord = require('discord.js');
let xp = require("../../xp.json");

//переменные 
const prefix = config.prefix;
const versions = config.versions;
let purple = config.purple;
const process = require('process');//просто чтобы была


//сами команды
function server_info(robot, mess, args) {//инфа о сервере и количестве людей
	mess.channel.send(`Server name: ${mess.guild.name}\nTotal members: ${mess.guild.memberCount}`)
}

function help(robot, mess, args) {//выводит список всех команд доступных боту
  mess.delete().catch() 
  mess.reply("!hello !test !clear !heads_or_tails !random_name !server_info !user_info !kick !level")
}

function user_info(robot, mess, args) {//выводит информацию о самом юзере
  mess.delete().catch() 
  mess.reply(`Your username: ${mess.author.username}\nYour ID: ${mess.author.id}`);
}

function level(robot, mess, args) {//показывает уровень пользователя
  mess.delete().catch() 
  

  if(!xp[mess.author.id]){
    xp[mess.author.id] = {
      xp: 0,
      level: 1
   };
 }
   let curxp = xp[mess.author.id].xp;
   let curlvl = xp[mess.author.id].level;
   let nxtLvlXp = curlvl * 300;
   let difference = nxtLvlXp - curxp;
   let lvlEmbed = new Discord.MessageEmbed()
   .setAuthor(mess.author.username)
   .setColor(purple)
   .addField("Level", curlvl, true)
   .addField("XP", curxp, true)
   .setFooter(`${difference} XP til level up`, mess.author.displayAvatarURL);
 

   //тут убран таймер на ввод !level
   mess.channel.send(lvlEmbed)
}


//список всех команд для обработки в bot.js
// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды 
var comms_list = [{
    name: "server_info",
    out: server_info,
    about: "server_info"
  },
  {
    name: "help",
    out: help,
    about: "help"
  },
  {
    name: "user_info",
    out: user_info,
    about: "user_info"
  },
  {
    name: "level",
    out: level,
    about: "level"
  }
]



 
  
  


//
  module.exports.comms = comms_list;