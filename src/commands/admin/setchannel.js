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
			return message.channel.send({embeds: [embed]});
		}
		if (!args[0]) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please tag the channel you want to use!')]});

		let channel = message.mentions.channels.first();
		if (!channel) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please **tag** the channel you want to use!')]});

		try {
			db.set(`${message.guild.id}.channel`, channel.id);
			message.channel.send({ embeds: [embed.setColor('GREEN').setDescription(`✅ Successfully registered ${channel}.`)]});
		} catch (error) {
			message.channel.send({ embeds: [embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.')]});
		}

	}
};