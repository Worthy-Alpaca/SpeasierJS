const { Client, Collection } = require('discord.js');
const fs = require('fs');

class CustomClient extends Client {
	constructor(config) {
		super({});

		this.prefix = process.env.PREFIX;

		this.commands = new Collection();
		this.aliases = new Collection();
		this.categories = fs.readdirSync('./src/commands/');

		this.config = config;
	}
}

const client = new CustomClient();

module.exports = client;