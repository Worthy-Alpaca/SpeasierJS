const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json');

module.exports = {
	name: 'profile',
	category: 'user',
	description: 'Checks for a user profile',
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();

		if (!db.has(`${message.guild.id}${message.author.id}.voice`)) {
			embed.setColor('RED').setDescription(`❌ You have no voice registered. Use \`${config.prefix}register\` to register a new one!`);
			return message.reply(embed);
		}
		const voice = message.guild.roles.cache.get(db.get(`${message.guild.id}${message.author.id}.voice`));
		embed.setTimestamp();
		embed.setAuthor(`${message.member.displayName}`, message.member.user.displayAvatarURL());
		embed.setDescription('Here you\'ll find all information needed to use TTS.');
		embed.addField('Voices', voice);
		embed.setColor('RANDOM');
		if (db.has(`${message.guild.id}.channel`)) {
			const channel = message.guild.channels.cache.get(db.get(`${message.guild.id}.channel`));
			embed.addField('Channel', channel);
		}
		message.reply(embed);
        
	}
};