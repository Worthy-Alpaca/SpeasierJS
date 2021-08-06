const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { version } = require('../../package.json');

class CustomClient extends Client {
	constructor(config) {
		super({ intents: config.intents });

		this.prefix = '?';
		this.version = version;

		this.playing = new Map();

		this.commands = new Collection();
		this.aliases = new Collection();
		this.categories = fs.readdirSync('./src/commands/');

		this.config = config;
	}
}

const intents = [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_VOICE_STATES
];

const client = new CustomClient({intents});

module.exports = client;