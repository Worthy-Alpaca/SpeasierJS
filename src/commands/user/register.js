const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'register',
	category: 'user',
	description: 'Registers a voice to the user who sends it',
	usage: '<voice>',
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();
        
		if (db.has(`${message.guild.id}.registered.${message.author.id}.voice`)) {
			embed.setColor('RED').setDescription(`❌ You already have a voice registered. Use \`${client.prefix}unregister\` before registering a new one!`);
			return message.channel.send({ embeds: [embed] });
		}
		if (!args[0]) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please tag the voice role you want to use!')]});
        
		let voice = message.mentions.roles.first();
		let voices = db.get(`${message.guild.id}.voices`);
		if (!voices) return message.reply(`You need to create the voices first! Use \`${client.prefix}createvoices\` for that!`);
		if (!voice) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please **tag** the voice role you want to use!')]});
        
		if (!voices.includes(voice.name)) {
			return message.channel.send({ embeds: [embed.setColor('RED').setDescription('❌ You can\'t add that role!')]});
		}

		if (voice.members.size !== 0) {
			return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription(`❗ Someone is already using ${voice}! Please choose another voice.`)]});
		}

		try {
			db.set(`${message.guild.id}.registered.${message.author.id}.voice`, voice.id);
			message.channel.send({ embeds: [embed.setColor('GREEN').setDescription(`✅ Successfully registered ${voice} to you.`)]});
			message.member.roles.add(voice).catch();
		} catch (error) {
			message.channel.send({ embeds: [embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.')]});
		}

	}
};