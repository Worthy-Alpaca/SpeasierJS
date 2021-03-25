const Discord = require("discord.js");
const db = require('quick.db');
const config = require('../../config.json');

module.exports = {
    name: "unregister",
    category: "user",
    description: "Unregisters a voice to the user who sends it",
    execute: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        if (!db.has(`${message.author.id}.voice`) ) {
            embed.setColor('RED').setDescription(`❌ You have no voice registered. Use \`${config.prefix}register\` to register a new one!`);
            return message.reply(embed);
        }
        const voice = message.guild.roles.cache.get(db.get(`${message.author.id}.voice`))
        if (db.delete(`${message.author.id}.voice`)) {
            message.reply(embed.setColor('GREEN').setDescription(`✅ Successfully unregistered ${voice}.`));
            message.member.roles.remove(voice);
        } else {
            message.reply(embed.setColor('RED').setDescription(`❌ Something went wrong. Please contact a botadmin.`));
        }

    }
}