const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'getchannel',
	category: 'admin',
	description: 'Displays the current guild configuration',
	execute: async (client, message, args) => {
		const embed = new Discord.MessageEmbed();

		if (!db.has(`${message.guild.id}.channel`)) {
			embed.setColor('RED').setDescription(`❌ You have no channel registered. Use \`${client.prefix}setchannel\` to register a new one!`);
			return message.reply(embed);
		}
		const channel = message.guild.channels.cache.get(db.get(`${message.guild.id}.channel`));
		embed.setTimestamp();
		embed.setAuthor(`${message.member.displayName}`, message.member.user.displayAvatarURL());
		embed.setDescription('Here you\'ll find all information stored about the guild');
		embed.addField('Channel', channel);
		embed.setColor('RANDOM');
		message.reply(embed);

	}
};