const db = require('quick.db');
module.exports = {
	name: 'deletevoices',
	category: 'admin',
	description: 'Deletes the voice roles',
	execute: async (client, message, args) => {
		let voices = db.get(`${message.guild.id}.voices`);
		if (!voices) return message.reply('No voices available!');
		voices.forEach(voice => {
			let role = message.guild.roles.cache.find(r => r.name === voice);
			if (!role) return;
			role.delete();
		});
		db.delete(`${message.guild.id}.voices`);
		message.reply('Roles successfully deleted');

	}
};