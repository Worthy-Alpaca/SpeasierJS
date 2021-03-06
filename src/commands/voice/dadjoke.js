const fetch = require('node-fetch');
const textToSpeechSynth = require('../../utils/functions');

module.exports = {
	name: 'dadjoke',
	aliases: ['dd', 'dj'],
	category: 'voice',
	description: 'Sends a dadjoke',
	usage: '[search term]',
	execute: async (client, message, args) => {
		const search = args[0] || '';

		const result = await fetch(`https://icanhazdadjoke.com/search?term=${search}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}).then(res => {
			return res.json();
		});
		let joke = result.results[Math.floor(Math.random() * result.results.length)];
		if (message.member.voice.channel) {
			textToSpeechSynth(message, joke.joke);
		}
		return message.channel.send(joke.joke);
	}
};