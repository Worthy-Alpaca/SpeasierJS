const db = require('quick.db');
const { voices } = require('../../assets/voices.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'addvoice',
	category: 'admin',
	description: 'Adds a voice to be used and creates the corresponding role. See ?voices for available voices to add.',
	usage: '<Voice>',
	data: new SlashCommandBuilder()
		.setName('addvoice')
		.setDescription('Adds a voice to be used and creates the corresponding role. See ?voices for available voices to add.')
		.addStringOption(option =>
			option.setName('voice')
				.setDescription('Adds a voice')
				.setRequired(true)),
	execute: async (client, message, args) => {

		const voice = message.options ? message.options.getString('voice') : args[0];
		
		if (!db.has(`${message.guild.id}.voices`)) {
			db.set(`${message.guild.id}.voices`, voices.default);
		}

		if (voices.all.includes(voice)) {
			if (db.get(`${message.guild.id}.voices`).includes(voice)) {
				return message.reply(`\`${voice}\` already exists.`);
			}
			db.push(`${message.guild.id}.voices`, voice);
			let role = message.guild.roles.cache.find(r => r.name === voice);
			if (!role) {
				message.guild.roles.create({
					name: voice,
					mentionable: true
				})
					.then(() => message.reply('Role created.'))
					.catch((error) => message.reply(`Could not create a role for ${voice}`));
			}
		} else {
			return message.reply(`Cannot create ${voice}! It might be incompatible. Please check with the creator of the bot.`);
		}

	}
};