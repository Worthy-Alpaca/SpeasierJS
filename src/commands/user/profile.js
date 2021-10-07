const Discord = require('discord.js');
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'profile',
	category: 'user',
	description: 'Checks for a user profile',
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Checks for a user profile'),
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();

		if (!db.has(`${message.guild.id}.registered.${message.member.id}.voice`)) {
			embed.setColor('RED').setDescription(`❌ You have no voice registered. Use \`${client.prefix}register\` to register a new one!`);
			return message.reply({ embeds: [embed] });
		}
		const voice = message.guild.roles.cache.get(db.get(`${message.guild.id}.registered.${message.member.id}.voice`));
		embed.setTimestamp();
		embed.setAuthor(`${message.member.displayName}`, message.member.user.displayAvatarURL());
		embed.setDescription('Here you\'ll find all information needed to use TTS.');
		embed.addField('Registered Voice', voice.toString() ? voice.toString() : 'None');
		embed.setColor('RANDOM');
		if (db.has(`${message.guild.id}.channel`)) {
			const channel = message.guild.channels.cache.get(db.get(`${message.guild.id}.channel`));
			embed.addField('Channel', channel.toString());
		}
		if (db.has(`${message.guild.id}.registered.${message.member.id}.volume`)) {
			const volume = db.get(`${message.guild.id}.registered.${message.member.id}.volume`);
			embed.addField('Volume', volume.toString());
		}
		message.reply({ embeds: [embed] });
        
	}
};