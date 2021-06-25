const db = require('quick.db');
const { encrypt } = require('../../utils/functions');
module.exports = {
	name: 'setkeys',
	category: 'admin',
	description: 'Sets the access keys for AWS Polly. The message gets deleted immediatly and the keys encrypted. You can view the source code [here](https://github.com/Worthy-Alpaca/SpeasierJS/blob/main/src/commands/admin/setaccesskey.js)',
	usage: '<accessKeyID> <secretAccessKey>',
	execute: async (client, message, args) => {
		const accessKeyID = args[0];
		const secretAccessKey = args[1];
		await message.delete();

		db.set(`${message.guild.id}.config.accessKeyID`, encrypt(accessKeyID).toString());
		db.set(`${message.guild.id}.config.secretAccessKey`, encrypt(secretAccessKey).toString());
		message.reply('Keys successfully encrypted.');

	}
};