const db = require('quick.db');
var AWS = require('aws-sdk');
const Stream = require('stream');

module.exports = client => {
	client.on('message', async message => {
		if (message.author.bot) return;

		if (message.guild === null) return;

		if (message.channel.id === db.get(`${message.guild.id}.channel`)) {

			if (message.member.voice.channel === null) return;

			if (message.content.startsWith('https://') || message.content.startsWith('http://')) return;

			AWS.config.update({ region: 'us-west-2' });

			var voice = message.guild.roles.cache.get(db.get(`${message.guild.id}.registered.${message.author.id}.voice`));
			if (!voice) {
				voice = {
					name: 'Raveena'
				};
			}

			var content = message.content;
			var re = /[_]/g;
			if (message.content.startsWith('_') && message.content.endsWith('_')) {
				content = message.member.displayName + ' ' + message.content.replace(re, '');
			}

			var params = {
				OutputFormat: 'mp3',
				SampleRate: '24000',
				Text: content,
				TextType: 'text',
				VoiceId: voice.name
			};

			let polly = new AWS.Polly();

			polly.synthesizeSpeech(params, async function (err, data) {
				if (err) return message.reply(`An error occured, please contact a bot admin! Error: ${err}`);
				else {
					if (data.AudioStream instanceof Buffer) {
						var bufferStream = new Stream.PassThrough();
						let readable = bufferStream.end(data.AudioStream);
						const channel = message.member.voice.channel;
						channel.join().then(connection => {
							const dispatcher = connection.play(readable);
							dispatcher.on('start', () => {
								dispatcher.setVolume(0.70);
							});

							dispatcher.on('error', (err) => {
								connection.disconnect();
								return message.channel.send(`Something went wrong. Please contact a botadmin. Error: ${err}`);
							});
						});
					}
				}
			});
            
		} else {
			if (message.content.startsWith(client.prefix)) return runCommand(message);
		}
	});

	function runCommand(message) {
		const args = message.content.slice(client.prefix.length).trim().split(/ +/g);

		const command = args.shift().toLowerCase();

		if (command.length === 0) return;

		let cmd = client.commands.get(command);

		if (!cmd) cmd = client.commands.get(client.aliases.get(command));

		if (!cmd) return message.reply(`\`${client.prefix + command}\` doesn't exist!`);

		if (cmd.category === 'admin' && !message.member.hasPermission('ADMINISTRATOR')) {
			return message.reply('You don\'t have the required permission to use this command!');
		}

		cmd.execute(client, message, args);
	}
};

