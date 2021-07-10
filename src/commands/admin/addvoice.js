const db = require('quick.db');
const { voices } = require('../../assets/voices.json');
module.exports = {
	name: 'addvoice',
	category: 'admin',
	description: 'Adds a voice to be used and creates the corresponding role. See ?voices for available voices to add.',
	usage: '<Voice>',
	execute: async (client, message, args) => {
		
		if (!db.has(`${message.guild.id}.voices`)) {
			db.set(`${message.guild.id}.voices`, voices.default);
		}

		if (voices.all.includes(args[0])) {
			if (db.get(`${message.guild.id}.voices`).includes(args[0])) {
				return message.reply(`\`${args[0]}\` already exists.`);
			}
			db.push(`${message.guild.id}.voices`, args[0]);
			let role = message.guild.roles.cache.find(r => r.name === args[0]);
			if (!role) {
				message.guild.roles.create({
					data: {
						name: args[0],
						mentionable: true
					},
				})
					.then(() => message.reply('Role created.'))
					.catch((error) => message.reply(`Could not create a role for ${args[0]}`));
			}
		} else {
			return message.reply(`Cannot create ${args[0]}! It might be incompatible. Please check with the creator of the bot.`);
		}

	}
};