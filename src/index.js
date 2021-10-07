const fs = require('fs');
require('dotenv').config();
const client = require('./client/client');

['commands', 'publish'].forEach(handler => {
	require(`./handler/${handler}`)(client);
});

fs.readdirSync('./src/events').filter(file => file.endsWith('.js')).forEach(event => {
	require(`./events/${event}`)(client);
});

client.login(process.env.DISCORD_TOKEN);