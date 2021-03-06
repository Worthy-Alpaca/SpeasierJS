const db = require('quick.db');
const { encrypt } = require('../../utils/functions');
module.exports = {
	name: 'setkeys',
	category: 'admin',
	description: 'Sets the access keys for AWS Polly. The message gets deleted immediatly and the keys encrypted.',
	descriptionlong: 'Sets the access keys for AWS Polly. The message gets deleted immediatly and the keys encrypted. You can view the source code [here](https://github.com/Worthy-Alpaca/SpeasierJS/blob/main/src/commands/admin/setaccesskey.js)',
	usage: '<accessKeyID> <secretAccessKey>',
	execute: async (client, message, args) => {
		const accessKeyID = args[0];
		const secretAccessKey = args[1];
		await message.delete();

		if (!accessKeyID || !secretAccessKey) {
			return message.reply('You did not provide any keys to set.');
		}

		try {
			db.set(`${message.guild.id}.config.accessKeyID`, encrypt(accessKeyID).toString());
			db.set(`${message.guild.id}.config.secretAccessKey`, encrypt(secretAccessKey).toString());
		} catch (error) {
			return message.reply(`An error occured: ${error}`);
		}
		return message.reply('Keys successfully encrypted.');
	}
};