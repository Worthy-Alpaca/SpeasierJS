const db = require('quick.db');
const { voices } = require('../../assets/voices.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'createvoices',
	category: 'admin',
	description: 'Creates the standard voice roles',
	data: new SlashCommandBuilder()
		.setName('createvoices')
		.setDescription('Creates the standard voice roles'),
	execute: async (client, message, args) => {
		if (!db.has(`${message.guild.id}.voices`)) {
			db.set(`${message.guild.id}.voices`, voices.default);
		}
		voices.default.forEach(voice => {
			let role = message.guild.roles.cache.find(r => r.name === voice);
			if (!role) {
				message.guild.roles.create({
					data: {
						name: voice,
						mentionable: true
					},
				}).catch((error) => {
					return message.reply(`Could not create a role for ${voice}`);
				});
			}            
		});
		message.reply('Roles created!');
	}
};