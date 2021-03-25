const { prefix } = require('../config.json');
const db = require('quick.db');
var AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');

module.exports = client => {
    client.on('message', async message => {
        
        if (message.author.bot) return;
        
        if (message.guild === null) return;

        if (message.channel.id === db.get(`${message.guild.id}.channel`)) {

            if (message.member.voice.channel === null) return;
            if (!db.has(`${message.author.id}.voice`)) return;

            AWS.config.update({ region: "us-west-2" });

            const voice = message.guild.roles.cache.get(db.get(`${message.author.id}.voice`))

            var params = {
                OutputFormat: "mp3",
                SampleRate: "24000",
                Text: message.content,
                TextType: "text",
                VoiceId: voice.name
            };

            let polly = new AWS.Polly();

            polly.synthesizeSpeech(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {

                    let writeStream = fs.createWriteStream('./src/events/audio.mp3');
                    writeStream.write(data.AudioStream);
                    writeStream.on('ready', () => {
                        const channel = message.member.voice.channel;
                        channel.join().then(connection => {
                            const dispatcher = connection.play(path.join(__dirname, "audio.mp3"));
                            dispatcher.on('start', () => { 
                                dispatcher.setVolume(0.70);
                            });

                            dispatcher.on('error', (err) => connection.disconnect()); 
                        })
                    })
                }
            });


            
        } else {
            if (message.content.startsWith(prefix)) return runCommand(message);
        }
        
        
        
    })

    function runCommand(message) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if (command.length === 0) return;

        let cmd = client.commands.get(command);

        if (!cmd) command = client.commands.get(client.aliases.get(command));

        if (!cmd) return message.reply(`\`${prefix + command}\` doesn't exist!`);
        if (cmd.category === "admin" && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply("You don't have the required permission to use this command!");
        }

        cmd.execute(client, message, args);
    }
}

