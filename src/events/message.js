const db = require('quick.db');
const fetch = require('node-fetch');
const textToSpeechSynth = require('../utils/functions');

module.exports = client => {
	client.on('message', async message => {
		if (message.author.bot) return;

		if (message.guild === null) return;

		if (message.channel.id === db.get(`${message.guild.id}.channel`)) {

			if (message.member.voice.channel === null) return;

			return textToSpeechSynth(message);
            
		} else {
			if (message.content.startsWith(client.prefix)) return runCommand(message);
		}
	});

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

		if (cmd.category === 'admin' && !message.member.hasPermission('ADMINISTRATOR')) {
			return message.reply('You don\'t have the required permission to use this command!');
		}

		cmd.execute(client, message, args);
	}
};

