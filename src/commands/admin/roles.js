
module.exports = {
	name: 'createvoices',
	category: 'admin',
	description: 'Creates the voice roles',
	execute: async (client, message, args) => {
		let voices = ['Amy', 'Salli', 'Joanna', 'Ivy', 'Kendra', 'Kimberly', 'Matthew', 'Justin', 'Nicole', 'Russell', 'Emma', 'Brian', 'Raveena', 'Aditi', 'Geraint'];
		voices.forEach(voice => {
			let role = message.guild.roles.cache.find(r => r.name === voice);
			if (!role) {
				message.guild.roles.create({
					data: {
						name: voice,
						mentionable: true
					},
				}).catch((error) => message.reply(`Could not create a role for ${voice}`));
			}            
		});

	}
};