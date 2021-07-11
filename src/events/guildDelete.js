const db = require('quick.db');

module.exports = client => {
	client.on('guildDelete', guild => {
		client.users.fetch('595341356432621573', false).then(user => {
			user.send(`I was removed from: ${guild.name}, ${guild.id}`);
		});
		
		if (!db.has(`${guild.id}`)) return;
		let voices = db.get(`${guild.id}.voices`);

		voices.forEach(voice => {
			let role = message.guild.roles.cache.find(r => r.name === voice);
			if (!role) return;
			role.delete();
		});

		db.delete(`${guild.id}`);

		
	});
};