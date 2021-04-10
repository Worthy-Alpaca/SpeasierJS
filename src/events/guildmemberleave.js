const db = require('quick.db');

module.exports = client => {
	client.on('guildMemberRemove', member => {
		if (db.has(`${member.guild.id}.registered.${member.id}`)) {
			db.delete(`${member.guild.id}.registered.${member.id}`);
		}
	});
};