const fetch = require('node-fetch');

module.exports = {
	name: 'dadjoke',
	aliases: ['dd', 'dj'],
	category: 'voice',
	description: 'Sends a dadjoke',
	execute: async (client, message, args) => {
		const result = await fetch('https://icanhazdadjoke.com/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}).then(res => {
			return res.json();
		});

		return message.channel.send(result.joke);
	}
};