var AWS = require('aws-sdk');
const db = require('quick.db');
const Stream = require('stream');
const CryptoJS = require('crypto-js');
const { joinVoiceChannel, AudioPlayer, createAudioResource } = require('@discordjs/voice');

async function textToSpeechSynth(message, text) {
	if (!db.has(`${message.guild.id}.config.accessKeyID`) || !db.has(`${message.guild.id}.config.secretAccessKey`)) {
		return message.reply('You need to set your AWS credentials before using this bot. Use `?setkeys` to do that!');
	}
	AWS.config.update({
		region: 'us-west-2',
		accessKeyId: decrypt(db.get(`${message.guild.id}.config.accessKeyID`)).toString(CryptoJS.enc.Utf8),
		secretAccessKey: decrypt(db.get(`${message.guild.id}.config.secretAccessKey`)).toString(CryptoJS.enc.Utf8)
	});

	var voice = message.guild.roles.cache.get(db.get(`${message.guild.id}.registered.${message.author.id}.voice`));
	if (!voice) {
		voice = {
			name: 'Raveena'
		};
	}

	var content = message.content;
	if (text) content = text;
	var re = /[_]/g;
	if (content.startsWith('_') && content.endsWith('_')) {
		content = message.member.displayName + ' ' + message.content.replace(re, '');
	}

	if (content.includes('https://') || content.includes('http://')) {
		const args = content.split(' ');
		let cleanargs = [];
		args.forEach(arg => {
			if (arg.startsWith('https://') || arg.startsWith('http://')) {
				cleanargs.push('link');
			} else {
				cleanargs.push(arg);
			}
		});
		content = cleanargs.join(' ');
	}

	if (message.mentions.users.size > 0 || message.mentions.channels.size > 0) {
		content = await filterInteger(message, content);
	}

	if (content.includes('<:') && content.includes('>')) {
		var reg2 = /[<:>0-9]/g;
		content = content.replace(reg2, '');
	}

	var params = {
		OutputFormat: 'mp3',
		SampleRate: '24000',
		Text: content,
		TextType: 'text',
		VoiceId: voice.name
	};

	let polly = new AWS.Polly();

	let volume = db.get(`${message.guild.id}.registered.${message.author.id}.volume`) || 1;

	polly.synthesizeSpeech(params, async function (err, data) {
		if (err) return message.reply(`An error occured, please contact a bot admin! Error: ${err}`);
		else {
			if (data.AudioStream instanceof Buffer) {
				var bufferStream = new Stream.PassThrough();
				let readable = bufferStream.end(data.AudioStream);
				const channel = message.member.voice.channel;
				const connection =  joinVoiceChannel({
					channelId: channel.id,
					guildId: channel.guild.id,
					adapterCreator: channel.guild.voiceAdapterCreator
				});
				const player = new AudioPlayer();
				connection.subscribe(player);
				const audio = createAudioResource(readable, {inlineVolume: true});
				audio.volume.setVolume(volume);
				player.play(audio);
				player.on('error', (err) => {
					connection.destroy();
					return message.channel.send(`Something went wrong. Please contact a botadmin. Error: ${err}`);
				});
			}
		}
	});
}

function filterInteger(message, content) {
	return new Promise(function (resolve, reject) {
		const args = content.trim().split(' ');
		let cleanstring = [];
		args.forEach(arg => {
			var string = Array.from(arg);
			if (string.includes('@') || string.includes('#')) {
				var mbr = [];
				string.forEach(function (letter) {
					if (Number.isInteger(+letter)) {
						mbr.push(letter);
					}
				});
				var mbr2 = message.guild.roles.cache.find(r => r.id === mbr.join('')) || message.guild.channels.cache.find(r => r.id === mbr.join(''));
				if (!mbr2) {
					mbr2 = message.guild.members.cache.find(r => r.id === mbr.join(''));
				} else {
					return cleanstring.push(mbr2.name);
				}
				return cleanstring.push(mbr2.displayName);
			} else {
				return cleanstring.push(string.join(''));
			}
		});
		return resolve(cleanstring.join(' '));
	});
}

function encrypt(token) {
	return CryptoJS.AES.encrypt(token, process.env.CRYPTO_CYPER);
}

function decrypt(token) {
	return CryptoJS.AES.decrypt(token, process.env.CRYPTO_CYPER);
}

module.exports = {textToSpeechSynth, encrypt, decrypt};