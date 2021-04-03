const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json');

module.exports = {
	name: 'delchannel',
	category: 'admin',
	description: 'Unregisters a text channel from the guild',
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();
		if (!db.has(`${message.guild.id}.channel`)) {
			embed.setColor('RED').setDescription(`❌ You have no channel registered. Use \`${config.prefix}setchannel\` to register a new one!`);
			return message.reply(embed);
		}
		const channel = message.guild.channels.cache.get(db.get(`${message.guild.id}.channel`));
		if (db.delete(`${message.guild.id}.channel`)) {
			message.reply(embed.setColor('GREEN').setDescription(`✅ Successfully unregistered ${channel}.`));
		} else {
			message.reply(embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.'));
		}

	}
};