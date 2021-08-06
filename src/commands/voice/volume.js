const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'volume',
	category: 'user',
	description: 'Sets the volume for the server',
	usage: '<number>',
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();

		if (!args[0]) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please tell me how loud you want me to be!')]});
		if (args[0].includes(',')) return message.channel.send({ embeds: [embed.setColor('YELLOW').setDescription('❗ Please use a point to notate partial volumes!')]});
		
		let volume = parseFloat(args[0]);

		try {
			db.set(`${message.guild.id}.registered.${message.author.id}.volume`, volume);
			message.channel.send({ embeds: [embed.setColor('GREEN').setDescription(`✅ Successfully registered ${volume} to you.`)]});
		} catch (error) {
			message.channel.send({ embeds: [embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.')]});
		}
	}
};