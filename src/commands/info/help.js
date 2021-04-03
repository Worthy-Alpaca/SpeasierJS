const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { version } = require('../../../package.json');
const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	aliases: ['info'],
	category: 'info',
	description: 'Returns this list',
	usage: '[command | alias]',
	execute: async (client, message, args) => {

		if (args[0]) {
			return getCMD(client, message, args[0]);
		} else {
			return getAll(client, message);
		}

	}


};


function getAll(client, message) {
	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setFooter(`Version: ${version}`)
		.setTimestamp()
		.setTitle('Help menu')
		.setThumbnail(client.user.displayAvatarURL());


	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `- \`${prefix}${cmd.name}\`=> \`${cmd.description}\``)
			.join('\n');

	};

	const info = client.categories
		.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
		.reduce((string, category) => string + '\n' + category);

	return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
	const embed = new Discord.MessageEmbed();

	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

	let info = `What do you mean with **${input.toLowerCase()}**? I don't know what you are talking about`;

	if (!cmd) {
		return message.channel.send(embed.setColor('RED').setDescription(info));

	}

	if (cmd.name) info = `**Command name**: ${cmd.name}`;
	if (cmd.aliases) info = `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
	if (cmd.description) info = `\n**Description**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**: ${cmd.usage}`;
		embed.setFooter('Syntax: <> = required, [] = optional');

	}

	return message.channel.send(embed.setColor('GREEN').setDescription(info));
}


