const Discord = require('discord.js');
const db = require('quick.db');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'register',
	category: 'user',
	description: 'Registers a voice to the user who sends it',
	usage: '<voice>',
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers a voice to the user who sends it')
		.addRoleOption(option => 
			option.setName('voice')
				.setDescription('Tag the voice which you want to register')
				.setRequired(true)),
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();
        
		if (db.has(`${message.guild.id}.registered.${message.member.id}.voice`)) {
			embed.setColor('RED').setDescription(`❌ You already have a voice registered. Use \`${client.prefix}unregister\` before registering a new one!`);
			return message.channel.send({ embeds: [embed] });
		}
		//if (!args[0]) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please tag the voice role you want to use!')]});
        
		//let voice = message.options.getRole('voice') || message.mentions.roles.first();
		let voice = message.options ? message.options.getRole('voice') : message.mentions.roles.first();
		let voices = db.get(`${message.guild.id}.voices`);
		if (!voices) return message.reply(`You need to create the voices first! Use \`${client.prefix}createvoices\` for that!`);
		if (!voice) return message.reply({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please **tag** the voice role you want to use!')]});
        
		if (!voices.includes(voice.name)) {
			return message.reply({ embeds: [embed.setColor('RED').setDescription('❌ You can\'t add that role!')]});
		}

		if (voice.members.size !== 0) {
			return message.reply({ embeds: [embed.setColor('YELLOW').setDescription(`❗ Someone is already using ${voice}! Please choose another voice.`)]});
		}

		try {
			db.set(`${message.guild.id}.registered.${message.member.id}.voice`, voice.id);
			message.reply({ embeds: [embed.setColor('GREEN').setDescription(`✅ Successfully registered ${voice} to you.`)]});
			message.member.roles.add(voice).catch();
		} catch (error) {
			message.reply({ embeds: [embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.')]});
		}

	}
};