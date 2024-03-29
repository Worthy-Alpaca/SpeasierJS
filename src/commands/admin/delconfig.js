const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'deleteconfig',
	category: 'admin',
	description: 'Deletes everything related to TTS',
	data: new SlashCommandBuilder()
		.setName('deleteconfig')
		.setDescription('Deletes everything related to TTS'),
	execute: async (client, message, args) => {
		if (!db.has(`${message.guild.id}`)) return message.reply('No config available!');
		let voices = db.get(`${message.guild.id}.voices`);
		
		voices.forEach(voice => {
			let role = message.guild.roles.cache.find(r => r.name === voice);
			if (!role) return;
			role.delete().catch(error => {
				return;
			});
		});

		db.delete(`${message.guild.id}`);
		message.reply('Server successfully deleted from database.');

	}
};