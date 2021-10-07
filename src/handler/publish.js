const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = async (client) => {
	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
	console.log('=== Publishing Slash Commands ===');
	if (process.env.PUBLISH === 'true') {
		rest.put(Routes.applicationCommands(client.id), { body: client.interactions })
			.then(() => console.log(('=== Successfully registered application commands ===')))
			.catch(console.error);
	} else {
		rest.put(Routes.applicationGuildCommands(client.id, process.env.DEV_SERVER), { body: client.interactions })
			.then(() => console.log(('=== Successfully registered DEV application commands ===')))
			.catch(console.error);
	}
};
