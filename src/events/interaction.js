const { Permissions } = require('discord.js');

module.exports = client => {
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		if (!interaction.inGuild()) return interaction.reply('This Bot does not allow slash commands in private messages!');

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		if (command.category === 'admin' && !interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			return interaction.reply({ content: 'You don\'t have the required permission to use this command!', ephemeral: true});
		}

		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	});
};