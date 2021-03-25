const Discord = require("discord.js");
const db = require('quick.db');
const config = require('../../config.json');

module.exports = {
    name: "register",
    category: "user",
    description: "Registers a voice to the user who sends it",
    usage: "<voice>",
    execute: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        
        if (db.has(`${message.author.id}.voice`)) {
            embed.setColor('RED').setDescription(`❌ You already have a voice registered. Use \`${config.prefix}unregister\` before registering a new one!`);
            return message.reply(embed);
        }
        if (!args[0]) return message.reply(embed.setColor('YELLOW').setDescription("❗ Please tag the voice role you want to use!"));
        
        let voice = message.mentions.roles.first();
        if (!voice) return message.reply(embed.setColor('YELLOW').setDescription("❗ Please **tag** the voice role you want to use!"));

        try {
            db.set(`${message.author.id}.voice`, voice.id);
            message.reply(embed.setColor('GREEN').setDescription(`✅ Successfully registered ${voice} to you.`));
            message.member.roles.add(voice);
        } catch (error) {
            message.reply(embed.setColor('RED').setDescription(`❌ Something went wrong. Please contact a botadmin.`));
        }

    }
}