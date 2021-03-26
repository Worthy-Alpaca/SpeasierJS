
module.exports = {
    name: "deletevoices",
    category: "admin",
    description: "Deletes the voice roles",
    execute: async (client, message, args) => {
        let voices = ["Salli", "Joanna", "Ivy", "Kendra", "Kimberly", "Matthew", "Justin", "Nicole", "Russell", "Amy", "Emma", "Brian", "Raveena", "Aditi", "Geraint"];
        voices.forEach(voice => {
            let role = message.guild.roles.cache.find(r => r.name === voice);
            if (!role) return;
            role.delete();
        })

    }
}