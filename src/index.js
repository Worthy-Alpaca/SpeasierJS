const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./src/commands/");

["commands"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

fs.readdirSync('./src/events').filter(file => file.endsWith(".js")).forEach(event => {
    require(`./events/${event}`)(client);
});

client.login(process.env.DISCORD_TOKEN);