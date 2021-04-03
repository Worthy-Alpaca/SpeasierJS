const { readdirSync } = require('fs');

const ascii = require('ascii-table');

// Create a new Ascii table
let table = new ascii('Commands');
table.setHeading('Command', 'Load status');

module.exports = async (client) => {
	var a = 0;
	console.log('=== System check in progress ===');
	console.log('=== Loading commands ===');
	// Read every commands subfolder
	readdirSync('./src/commands/').forEach(dir => {
		// Filter for .js command files
		const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
		console.log(`== loading ${dir} category ==`);
		// Loop over the commands, and add all of them to a collection
		// If there's no name found, prevent it from returning an error        
		for (let file of commands) {
			let pull = require(`../commands/${dir}/${file}`);
			if (pull.name && pull.category && pull.description) {

				client.commands.set(pull.name, pull);
				table.addRow(file, 'operational ✅');
			} else {
				// mandatory headers are: name, category, description, permission
				table.addRow(file, '❌  -> missing a mandatory header');
				a++;
				continue;
			}

			// If there's an aliases key, read the aliases.
			if (pull.aliases && Array.isArray(pull.aliases))
				pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
		}
	});
	// Log the table
	console.log(table.toString());
	console.log('=== Command loading complete ===');
	if (a > 0) {
		console.log(`${a} system(s) are not operational`);
	} else {
		console.log('All systems are operational');
		console.log('Commands successfully updated');
	}
	console.log('=== Test complete ===');
};



/*
module.exports = {
   name: "Command name",
   aliases: ["array", "of", "aliases"],
   category: "Category name",
   permission: ["none", "moderator", "admin", "null"],
   description: "Command description",
   usage: "[args input]",
   run: async (client, message, args) => {
       The code in here to execute
   }
}
*/
