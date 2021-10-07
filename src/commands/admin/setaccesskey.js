const db = require('quick.db');
const { encrypt } = require('../../utils/functions');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'setkeys',
	category: 'admin',
	description: 'Sets the access keys for AWS Polly. The message gets deleted immediatly and the keys are encrypted.',
	descriptionlong: 'Sets the access keys for AWS Polly. The message gets deleted immediatly and the keys are encrypted. You can view the source code [here](https://github.com/Worthy-Alpaca/SpeasierJS/blob/main/src/commands/admin/setaccesskey.js)',
	usage: '<accessKeyID> <secretAccessKey>',
	data: new SlashCommandBuilder()
		.setName('setkeys')
		.setDescription('Sets the access keys for AWS Polly. The message gets deleted immediatly and the keys are encrypted.')
		.addStringOption(option =>
			option.setName('accesskeyid')
				.setDescription('The access key ID')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('secretaccesskey')
				.setDescription('The secret access key')
				.setRequired(true)),
	execute: async (client, message, args) => {
		const accessKeyID = message.options ? message.options.getString('accesskeyid') : args[0];
		const secretAccessKey = message.options ? message.options.getString('secretaccesskey') : args[1];
		if (!message.options) await message.delete();
		
		if (!accessKeyID || !secretAccessKey) {
			return message.options ? message.reply('You did not provide any keys to set.') : message.channel.send('You did not provide any keys to set.');
		}

		try {
			db.set(`${message.guild.id}.config.accessKeyID`, encrypt(accessKeyID).toString());
			db.set(`${message.guild.id}.config.secretAccessKey`, encrypt(secretAccessKey).toString());
		} catch (error) {
			return message.options ? message.reply(`An error occured: ${error}`) : message.channel.send(`An error occured: ${error}`);
		}
		return message.options ? message.reply('Keys successfully encrypted.') : message.channel.send('Keys successfully encrypted.');
	}
};