const fs = require('fs');
const client = require('./client/client');
require('dotenv').config();

['commands'].forEach(handler => {
	require(`./handler/${handler}`)(client);
});

fs.readdirSync('./src/events').filter(file => file.endsWith('.js')).forEach(event => {
	require(`./events/${event}`)(client);
});

client.login(process.env.DISCORD_TOKEN);