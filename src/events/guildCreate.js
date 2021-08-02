const Discord = require('discord.js');

module.exports = client => {
	client.on('guildCreate', guild => {
		client.users.fetch('595341356432621573', false).then(user => {
			user.send(`I was added to a new server: ${guild.name}, ${guild.id}`);
		});

		const embed = new Discord.MessageEmbed()
			.setTimestamp()
			.setTitle('Thank you for adding me!')
			.setDescription('Thank you for adding me to your guild. Please see [here](https://worthy-alpaca.github.io/SpeasierJS/) for documentation on how to make me work for you.')
			.setFooter(`Version: ${client.version}`);

		let channel = guild.systemChannel();

		if (!channel) {
			return guild.owner.send(embed);
		}

		channel.send(embed);
	});
};