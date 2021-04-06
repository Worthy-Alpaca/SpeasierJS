const { Client } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({});

		this.prefix = '?';

		this.config = config;
	}
};