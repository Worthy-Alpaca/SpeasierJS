const { prefix } = require('../config.json');
module.exports = client => {
    client.on('message', message => {
        // check if the author is a bot
        if (message.author.bot) return;
        // check if the message comes through a DM
        if (message.guild === null) return;
        // check if the message starts with it
        if (!message.content.startsWith(prefix)) return;
        // slice off the prefix and convert the rest of the message into an array
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        // convert all arguments to lowercase
        const command = args.shift().toLowerCase();
        // check if there is a message after the prefix
        if (command.length === 0) return;
        // look for the specified command in the collection of commands
        let cmd = client.commands.get(command);
        // Check aliases
        if (!cmd) command = client.commands.get(client.aliases.get(command));
        // if there is no command we return with an error message
        if (!cmd) return message.reply(`\`${prefix + command}\` doesn't exist!`);
        if (cmd.category === "admin" && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply("You don't have the required permission to use this command!");
        }
        // finally run the command
        cmd.execute(client, message, args);
    })
}