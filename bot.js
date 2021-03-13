/*команды для запуска бота вводить по порядку

  npm install 
  npm install discord.js  

  старт бота 
  node bot.js  


  coins.json-монеты
  xp.json-опыт
*/


//подключение файлов
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const robot = new Discord.Client(); // Объявляем, что robot - бот
const comms = require("./commands/classic/comms.js"); // Подключаем файл с командами для бота classic
const comms1 = require("./commands/info/infocomms.js"); // Подключаем файл с командами для бота info
const fs = require('fs'); // Подключаем родной модуль файловой системы node.js  
let config = require('./config.json'); // Подключаем файл с параметрами и информацией
let coins = require("./coins.json");
let xp = require("./xp.json");


//переменные
let token = config.token; // «Вытаскиваем» из него токен
let prefix = config.prefix; // «Вытаскиваем» из него префикс
let purple = config.purple;

/*
этот кусок должен заменять перечесление comms comms1 на готовый массив НЕ РАБОТАЕТ


const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
*/



robot.on("ready", function() {
  /* При успешном запуске, в консоли появится сообщение «[Имя бота] запустился!» */
  console.log(robot.user.username + " запустился!");
  console.log("https://discord.com/api/oauth2/authorize?client_id=819644469267005451&permissions=8&scope=bot")
  robot.generateInvite(['KICK_MEMBERS', 'BAN_MEMBERS', 'SEND_MESSAGES',"ADMINISTRATOR"]).then((link) => { 
    console.log(link);})
});



robot.on('message', (msg) => { // Реагирование на сообщения
  if (msg.author.username != robot.user.username && msg.author.discriminator != robot.user.discriminator) {
    var comm = msg.content.trim() + " ";
    var comm_name = comm.slice(0, comm.indexOf(" "));
    var messArr = comm.split(" ");
    for (comm_count in comms.comms) {
      var comm2 = prefix + comms.comms[comm_count].name;
      if (comm2 == comm_name) {
        comms.comms[comm_count].out(robot, msg, messArr);
      }
    }

    for (comm_count in comms1.comms) {
      var comm2 = prefix + comms1.comms[comm_count].name;
      if (comm2 == comm_name) {
        comms1.comms[comm_count].out(robot, msg, messArr);
      }
    }

  }

  

  //ниже логика команды !level
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;

  if(!prefix[msg.guild.id]){
    prefix[msg.guild.id] = {
      prefix: config.prefix
    };
  }


  if(!coins[msg.author.id]){
    coins[msg.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[msg.author.id] = {
      coins: coins[msg.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.MessageEmbed()
  .setAuthor(msg.author.username)

  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  msg.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[msg.author.id]){
    xp[msg.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[msg.author.id].xp;
  let curlvl = xp[msg.author.id].level;
  let nxtLvl = xp[msg.author.id].level * 300;
  xp[msg.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[msg.author.id].xp){
    xp[msg.author.id].level = curlvl + 1;
    let lvlup = new Discord.MessageEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    mess.channel.send(lvlup).then(msg => {msg.delete(5000)});


  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });


  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  
/*кусок который нужно поченить start

//оригинал строки
  //let prefixUser = prefix[msg.guild.id].prefix;
//вариант с которы1 получился у меня 
  let prefixUser = msg.author.id;

//в оригинале тут еще 2 строчки но они не работают
//let commandfile = robot.commands.get(cmd.slice(prefixUser.length));
  //if(commandfile) commandfile.run(robot,message,args);

кусок который нужно поченить end
*/

});

robot.login(token); // Авторизация бота