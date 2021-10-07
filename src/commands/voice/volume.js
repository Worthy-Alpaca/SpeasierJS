const Discord = require('discord.js');
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'volume',
	category: 'user',
	description: 'Sets the volume for the member who uses the command',
	usage: '<number>',
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Sets the volume for the member who uses the command')
		.addNumberOption(option =>
			option.setName('volume')
				.setDescription('Sets the volume. Ideally between 0 and 1.')
				.setRequired(true)),
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();

		const option = message.options ? message.options.getNumber('volume') : args[0];

		if (!option) return message.reply({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please tell me how loud you want me to be!')]});
		if (isNaN(option)) {
			if (option.includes(',')) return message.reply({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please use a point to notate partial volumes!')] });
		}
		
		let volume = parseFloat(option);

		try {
			db.set(`${message.guild.id}.registered.${message.member.id}.volume`, volume);
			message.reply({ embeds: [embed.setColor('GREEN').setDescription(`✅ Successfully registered ${volume} to you.`)]});
		} catch (error) {
			message.reply({ embeds: [embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.')]});
		}
	}
};