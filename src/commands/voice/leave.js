const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'leave',
	category: 'voice',
	description: 'Disconnects the bot',
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Disconnects the bot'),
	execute: async (client, message, args) => {
		/* const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('You need to be in a voice channel with the bot for this command to work!');
		message.react('✔').then(() => {
			voiceChannel.leave();
		}); */
		const connection = getVoiceConnection(message.guild.id);
		connection.destroy();
	}
};