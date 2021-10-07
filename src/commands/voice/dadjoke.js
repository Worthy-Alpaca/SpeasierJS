const fetch = require('node-fetch');
const {textToSpeechSynth} = require('../../utils/functions');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'dadjoke',
	aliases: ['dd', 'dj'],
	category: 'voice',
	description: 'Sends a dadjoke',
	usage: '[search term]',
	data: new SlashCommandBuilder()
		.setName('dadjoke')
		.setDescription('Sends a dadjoke')
		.addStringOption(option =>
			option.setName('search')
				.setDescription('Searches for fitting dadjokes')
				.setRequired(false)),
	execute: async (client, message, args) => {
		const search = message.options ? message.options.getString('search') : args[0] || '';
		const result = await fetch(`https://icanhazdadjoke.com/search?term=${search ? search : ''}`, {
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
		return message.reply(joke.joke);
	}
};