const db = require('quick.db');
const fetch = require('node-fetch');
const { textToSpeechSynth } = require('../utils/functions');
const { Permissions } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = client => {
	client.on('messageCreate', async message => {
		if (message.author.bot) return;

		if (message.guild === null) return;

		if (message.content.startsWith(client.prefix)) return runCommand(message);
		
		if (message.channel.id === db.get(`${message.guild.id}.channel`)) {

			if (message.member.voice.channel === null) return;

			const time = 900000;

			client.playing.set(message.guild.id, Date.now() + time);
			
			setTimeout(() => {
				if (client.playing.get(message.guild.id) > Date.now()) {
					return;
				} else {
					const connection = getVoiceConnection(message.guild.id);
					connection.destroy();
				}
			}, time);
			

			return textToSpeechSynth(message);
            
		} 
	});

	// function to handle commands
	async function runCommand(message) {
		const args = message.content.slice(client.prefix.length).trim().split(/ +/g);

		const command = args.shift().toLowerCase();

		if (command.length === 0) return;

		let cmd = client.commands.get(command);

		if (!cmd) cmd = client.commands.get(client.aliases.get(command));

		if (!cmd) {
			const result = await fetch('https://icanhazdadjoke.com/', {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				}
			}).then(res => {
				return res.json();
			});
			message.reply(`\`${client.prefix + command}\` doesn't exist! Have a dadjoke instead:`);
			return message.channel.send(result.joke);
		}

		if (cmd.category === 'admin' && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			return message.reply('You don\'t have the required permission to use this command!');
		}

		cmd.execute(client, message, args);
	}
};

