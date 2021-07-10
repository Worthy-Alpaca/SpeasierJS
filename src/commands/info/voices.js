const db = require('quick.db');
const Discord = require('discord.js');
const { voices } = require('../../assets/voices.json');
module.exports = {
	name: 'voices',
	category: 'info',
	description: 'Displays all available voices',
	execute: async (client, message, args) => {

		const cVoices = db.get(`${message.guild.id}.voices`) || voices.default;
		const aVoices = voices.all.filter(n => !cVoices.includes(n));
		const embed = new Discord.MessageEmbed()
			.setTimestamp()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setTitle('Available Voices')
			.addField('Usable Voices', cVoices.join('\n'), true)
			.addField('Addable Voices', aVoices.join('\n'), true);
		
		return message.channel.send(embed);

	}
};