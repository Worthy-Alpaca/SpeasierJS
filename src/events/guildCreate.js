

module.exports = client => {
	client.on('guildCreate', guild => {
		client.users.fetch('595341356432621573', false).then(user => {
			user.send(`I was added to a new server: ${guild.name}, ${guild.id}`);
		});
	});
};