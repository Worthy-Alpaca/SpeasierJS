const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'register',
	category: 'user',
	description: 'Registers a voice to the user who sends it',
	usage: '<voice>',
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();
        
		if (db.has(`${message.guild.id}${message.author.id}.voice`)) {
			embed.setColor('RED').setDescription(`❌ You already have a voice registered. Use \`${client.prefix}unregister\` before registering a new one!`);
			return message.reply(embed);
		}
		if (!args[0]) return message.reply(embed.setColor('YELLOW').setDescription('❗ Please tag the voice role you want to use!'));
        
		let voice = message.mentions.roles.first();
		let voices = ['Salli', 'Joanna', 'Ivy', 'Kendra', 'Kimberly', 'Matthew', 'Justin', 'Nicole', 'Russell', 'Amy', 'Emma', 'Brian', 'Raveena', 'Aditi', 'Geraint'];
        
		if (!voice) return message.reply(embed.setColor('YELLOW').setDescription('❗ Please **tag** the voice role you want to use!'));
        
		if (!voices.includes(voice.name)) {
			return message.reply(embed.setColor('RED').setDescription('❌ You can\'t add that role!'));
		}

		if (voice.members.size !== 0) {
			return message.reply(embed.setColor('YELLOW').setDescription(`❗ Someone is already using ${voice}! Please choose another voice.`));
		}

		try {
			db.set(`${message.guild.id}${message.author.id}.voice`, voice.id);
			message.reply(embed.setColor('GREEN').setDescription(`✅ Successfully registered ${voice} to you.`));
			message.member.roles.add(voice).catch();
		} catch (error) {
			message.reply(embed.setColor('RED').setDescription('❌ Something went wrong. Please contact a botadmin.'));
		}

	}
};