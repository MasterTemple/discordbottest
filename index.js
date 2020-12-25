const Discord = require('discord.js');
const fs = require('fs');
const puppeteer = require('puppeteer');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { prefix, token, bot_age, words_array, bot_info, owner } = require('./config.json');
var today = new Date().getHours();
var date = new Date();
var utcDate = new Date(date.toUTCString());
utcDate.setHours(utcDate.getHours() - 7);
var usDate = new Date(utcDate);
console.log(usDate);

const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;





setInterval(/*todo*/() => {


  if (usDate.getHours() >= 22 || usDate.getHours() <= 3) {

    if (client.users.cache.get("703120460023463986").presence.status === "online" || client.users.cache.get("703120460023463986").presence.status === "idle" || client.users.cache.get("703120460023463986").presence.status === "dnd") {
      client.users.cache.get("703120460023463986").send("Go to bed");
    }
  }
}, 300000/*time in ms*/)

setInterval(/*todo*/() => {


  if (usDate.getHours() >= 22 || usDate.getHours() <= 3) {

    if (client.users.cache.get("477289071320760331").presence.status === "online" || client.users.cache.get("477289071320760331").presence.status === "idle" || client.users.cache.get("477289071320760331").presence.status === "dnd") {
      client.users.cache.get("477289071320760331").send("Go to bed");
    }
  }
}, 300000/*time in ms*/)


client.once('ready', () => {
  console.log(bot_info.name);
  console.log('My bot is online!');

});


//gets all commands from other files
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
//gets all commands from other files

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //if (client.users.cache.get("703120460023463986").presence.status === "online" ||    //client.users.cache.get("703120460023463986").presence.status === "idle" ||    //client.users.cache.get("703120460023463986").presence.status === "dnd"){
  //  client.users.cache.get("703120460023463986").send("Go to bed");
  //}



  client.user.setStatus("online");

});


client.on('message', message => {


  async function getVOTD(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div[2]/div/div[1]/div');
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();
    message.channel.send(rawTxt);
    console.log({ rawTxt });

    browser.close();
  }

  const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#00ff99')
      .setTitle('Merry & Bright: Celebrating Christmas Every Day')
      .setURL('https://www.bible.com/reading-plans/17399-merry-bright-celebrating-christmas-every-day/')
      .setAuthor('YouVersion', 'https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png', 'https://www.bible.com/reading-plans/17399-merry-bright-celebrating-christmas-every-day/')
      .setDescription('There’s something special about Christmas that tends to bring out the best in all of us. We’re usually kinder, more generous, and spend more time with those we love. But what if it didn’t have to end in December? What if we could celebrate Christmas every day?')
      .setThumbnail('https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png')
      //.addFields(
      //    { name: 'Regular field title', value: 'Some value here' },
      //    { name: '\u200B', value: '\u200B' },
      //    { name: 'Inline field title', value: 'Some value here', inline: true },
      //    { name: 'Inline field title', value: 'Some value here', inline: true },
      //)
      //.addField('Inline field title', 'Some value here', true)
      .setImage('https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/17399/720x405.jpg')
      .setTimestamp()
      .setFooter('This original Bible Plan was created and provided by YouVersion.', 'https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png');


  //turns bot off
  if ((message.author.bot && message.channel == `761023739592048649`) || message.channel == `761023739592048649`) return;
  //message.react('✋');
  //message.react('😑');

  client.channels.cache.get('761023739592048649').send(`${message.author.username} in ${message.channel}: ${message.content}`);//logs messages
  console.log(`${message.author.username} in ${message.channel}: ${message.content}`)
  if (message.content === `${prefix}off`) {

    client.user.setPresence({ status: "offline", });

    client.destroy();
  }
  //checks for prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;





  const args = message.content.slice(prefix.length).trim().split(/ +/); //each space is a new argument
  const commandName = args.shift().toLowerCase();

  //new_status = args[0];


  if (message.content.includes(`${prefix}peat`)) {
    client.users.cache.get("477289071320760331").send(message.content.substring(6));

  }

  if (message.content.includes(`${prefix}dm`)) {
    try {
      client.users.cache.get(`${args[0]}`).send(message.content.substring(args[0].length + 4));

    } catch (error) {

      client.channels.cache.get(`${args[0]}`).send(message.content.substring(args[0].length + 4));

    }
  }

  if (message.content.includes(`${prefix}embed`)) {
    message.channel.send(exampleEmbed);
  }

  if (message.content.includes(`${prefix}verse`)) {
    getVOTD('https://www.verseoftheday.com/');
    //message.channel.send(${rawTxt});
  }
  if (message.content.includes(`${prefix}plan`)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    console.log(args);
    var url = `https://www.bible.com/reading-plans/17399-merry-bright-celebrating-christmas-every-day/day/${args[1]}`;
    //var url = `${args[1]}/day/${args[2]}`;
    axios.get(url)
        .then((res) => {
          const { document } = (new JSDOM(res.data)).window;

          var pqstxt = document.querySelectorAll('p');
          //console.log(pqstxt);
          /*
          Array.from(pqstxt).forEach(function(devo){
            message.channel.send(`${devo.textContent}\n`);
            console.log(devo.textContent);
          })
          */
          var devo = Array.from(pqstxt);
          console.log(devo.length);
          for(i=0;i < (devo.length); i+=3){

            message.channel.send(`\n${devo[i].textContent}\n\n${devo[i + 1].textContent}\n\n${devo[i + 2].textContent}`);
            console.log(devo[i].textContent);
          }

          /*
          var listxt = document.querySelectorAll('li');
          //console.log(pqstxt);
          Array.from(listxt).forEach(function(devo){
            message.channel.send(`${devo.textContent}\n`);
            console.log(devo.textContent);
          })
           */

        });
    //getPlan('https://www.bible.com/reading-plans/17399-merry-bright-celebrating-christmas-every-day/day/1');
    //message.channel.send(${rawTxt});
  }

  if (message.content.includes(`${prefix}devo`)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    console.log(args);
    var url = `https://www.bible.com/reading-plans/17399-merry-bright-celebrating-christmas-every-day/day/${args[1]}`;

    axios.get(url)
        .then((res) => {
          const { document } = (new JSDOM(res.data)).window;

          var day = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(4) > div:nth-child(3) > div > p > span:nth-child(1)").textContent;
          var title = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > p:nth-child(1)").textContent;
          var ref = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(4) > div:nth-child(3) > div > ul").textContent;


          console.log(`**${day}**\n\n**${title}**\n\nScriptures:\n${ref}\n`);
          message.channel.send(`**${day}**\n\n**${title}**\n\nScriptures:\n${ref}\n`);

          var plan = document.querySelectorAll("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5)");
          //console.log(plan.textContent);
          //message.channel.send(plan.textContent);

          Array.from(plan).forEach(function(devo){
            //console.log(devo.textContent);
            //this does nothing
          })


          var range = 100;
          for(i = 3;; i++){
            try {
              console.log(document.querySelector(`#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > p:nth-child(${i})`).textContent);
              message.channel.send(document.querySelector(`#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > p:nth-child(${i})`).textContent);
            }
            catch{
              try{
                console.log(document.querySelector(`#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > ul:nth-child(${i})`).textContent);
                message.channel.send(document.querySelector(`#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > ul:nth-child(${i})`).textContent);
              }
              catch{
                console.log(`឵឵`);
                message.channel.send(`឵឵`);
                if(('#react-app-PlanDiscovery').length < i-2){
                  break;
                }
              }
            }
          }

        });
  }


  if (message.content.includes(`${prefix}info`)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    console.log(args);
    var url = `${args[1]}`;

    axios.get(url)
        .then((res) => {
          const { document } = (new JSDOM(res.data)).window;

          const youVersionLogo = `https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png`;
          var planTitle = document.querySelector("#react-app-PlanDiscovery > div > div.row.collapse.about-plan.horizontal-center > div > article > div:nth-child(2) > div.columns.large-8.medium-8 > h1").textContent;
          var planDescription = document.querySelector("#react-app-PlanDiscovery > div > div.row.collapse.about-plan.horizontal-center > div > article > div:nth-child(2) > div.columns.large-8.medium-8 > p.plan_about").textContent;
          var planNumber = url.substring(36,41);
          //message.channel.send(planNumber);
          var planLogo = `https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/${planNumber}/720x405.jpg`;
          var numberOfDays = document.querySelector("#react-app-PlanDiscovery > div > div.row.collapse.about-plan.horizontal-center > div > article > div:nth-child(2) > div.columns.large-8.medium-8 > p.plan_length").textContent;
          var planAuthor = `YouVersion`;
          var allPlans = `https://www.bible.com/reading-plans`;
          var footerText = document.querySelector("#react-app-PlanDiscovery > div > div.row.collapse.about-plan.horizontal-center > div > article > div:nth-child(2) > div.columns.large-8.medium-8 > p:nth-child(6)").textContent;
          //var footerImage= `https://i.pinimg.com/originals/17/e3/70/17e370ff54f49281f212e8a9d34e2996.png`;
          //var url;

          const planEmbed = new Discord.MessageEmbed()
              .setColor('#00ff99')
              .setTitle(planTitle)
              .setURL(url)
              .setAuthor(planAuthor, youVersionLogo, allPlans)
              .setDescription(planDescription)
              .setThumbnail(youVersionLogo)
              .addField('Time', numberOfDays, true)
              .setImage(planLogo)
              .setTimestamp()
              .setFooter(footerText, youVersionLogo);

          message.channel.send(planEmbed);


        });
  }

  //client.users.cache.get(`${args[0]}`).send(message.content.substring(args[0].length + 4));

  //message = args[0];
  //message.react('✋').then(() => message.react('😑'));


  //client.users.cache.get("703120460023463986").send(`${args}`); sends each arg with comma
  //client.users.cache.get("477289071320760331").send(message.content.substring(4));

  //message.channel.send(`${usDate}`);
  //message.channel.send(usDate.getHours());

  //message.channel.send(message.channel);
  //message.channel.send(`${args[0]} + ${args[1]} = ${args[0]+args[1]}`);
  //const new_status = message.content.substring(6);

  //return client.user.setPresence({ activity: { name: new_status}});
  // client.channels.fetch('759190434978726000')
  //.then(channel => console.log(channel.name))
  //.catch(console.error);
  //const channel = client.channels.cache.get('<id>');

  //const channel = '759190434978726000';
  //channel.send('hi');

  //const taggedUser = message.mentions.users.first();
  //taggedUser.send('hi');

  //message.channel.send(client.user.presence.status);
  //message.channel.send(message.author.presence.status);
  //message.channel.send( "you are" + client.user.status );




  //not sure lol and idc rn
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  //checks for command erroer
  try {
    command.execute(message)

  } catch (error) {
    try {
      command.execute(message, args)
    } catch (error) {
      console.error(error);
      message.react('✋');
      message.react('😑');
      message.reply('There was an issue executing that command! 😭');
    }
  }





});

client.login(token);
