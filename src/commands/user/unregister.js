const Discord = require('discord.js');
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'unregister',
	category: 'user',
	description: 'Unregisters a voice to the user who sends it',
	data: new SlashCommandBuilder()
		.setName('unregister')
		.setDescription('Unregisters a voice to the user who sends it'),
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();
		if (!db.has(`${message.guild.id}.registered.${message.member.id}.voice`) ) {
			embed.setColor('RED').setDescription(`❌ You have no voice registered. Use \`${client.prefix}register\` to register a new one!`);
			return message.reply({embeds: [embed]});
		}
		const voice = message.guild.roles.cache.get(db.get(`${message.guild.id}.registered.${message.member.id}.voice`));
		if (db.delete(`${message.guild.id}.registered.${message.member.id}.voice`)) {
			message.reply({ embeds: [embed.setColor('GREEN').setDescription(`✅ Successfully unregistered ${voice}.`)]});
			message.member.roles.remove(voice).catch(error => {
				return message.reply({ embeds: [embed.setColor('RED').setDescription(`❌ Something went wrong. Please contact a botadmin. Error: ${error}`)]});
			});
		} else {
			return message.reply({ embeds: [embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.')]});
		}

	}
};