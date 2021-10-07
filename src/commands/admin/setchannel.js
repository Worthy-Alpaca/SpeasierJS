const Discord = require('discord.js');
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'setchannel',
	category: 'admin',
	description: 'Registers a text channel to listen too',
	usage: '<channel>',
	data: new SlashCommandBuilder()
		.setName('setchannel')
		.setDescription('Registers a text channel to listen too')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to be used')
				.setRequired(true)),
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();
		if (db.has(`${message.guild.id}.channel`)) {
			embed.setColor('RED').setDescription(`❌ You already have a channel registered. Use \`${client.prefix}delchannel\` before registering a new one!`);
			return message.channel.send({embeds: [embed]});
		}
		//if (!args[0]) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please tag the channel you want to use!')]});

		let channel = message.options ? message.options.getChannel('channel') : message.mentions.channels.first();
		if (!channel) return message.reply({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please **tag** the channel you want to use!')]});

		try {
			db.set(`${message.guild.id}.channel`, channel.id);
			message.reply({ embeds: [embed.setColor('GREEN').setDescription(`✅ Successfully registered ${channel}.`)]});
		} catch (error) {
			message.reply({ embeds: [embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.')]});
		}

	}
};