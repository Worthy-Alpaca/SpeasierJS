const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'setchannel',
	category: 'admin',
	description: 'Registers a text channel to listen too',
	usage: '<channel>',
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();
		if (db.has(`${message.guild.id}.channel`)) {
			embed.setColor('RED').setDescription(`❌ You already have a channel registered. Use \`${client.prefix}delchannel\` before registering a new one!`);
			return message.reply(embed);
		}
		if (!args[0]) return message.reply(embed.setColor('YELLOW').setDescription('❗ Please tag the channel you want to use!'));

		let channel = message.mentions.channels.first();
		if (!channel) return message.reply(embed.setColor('YELLOW').setDescription('❗ Please **tag** the channel you want to use!'));

		try {
			db.set(`${message.guild.id}.channel`, channel.id);
			message.reply(embed.setColor('GREEN').setDescription(`✅ Successfully registered ${channel}. Commands will no longer work in that channel!`));
		} catch (error) {
			message.reply(embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.'));
		}

	}
};