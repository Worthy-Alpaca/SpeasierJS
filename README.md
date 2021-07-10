# SpeasierJS

Welcome to Speasier in it's Javascript variant. 

This bot allows you to use Amazons Polly TTS engine so that you may speak without actually speaking.

You will need an AWS Account since this bot needs your `AWS Access Key ID` and your `AWS Secret Access Key` to work. Those access
keys will be encrypted using CryptoJS in the AES encryption and stored in the database.

For this to work you need to have a number of roles on your discord server, corresponding with the voices available with Polly.

Those voices include, but are not [limited](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html) to: "Salli", "Joanna", "Ivy", "Kendra", "Kimberly", "Matthew", "Justin", "Nicole", "Russell", "Amy", "Emma", "Brian", "Raveena", "Aditi", "Geraint", "Joey". This bot also includes a command to create these roles for you. You can add new Voices from the list of available ones.

The prefix for this bot is `?` and it includes a `?help` command where you can view all other commands. Commands under the `admin` category require server administrator permissions to execute.

You can invite Speasier to your server [here][invite].

## How to setup

1. Create the voice roles

2. Add your `AWS Access Key ID` and your `AWS Secret Access Key` using the `?setkeys <accessKeyID> <secretAccessKey>` command.

3. Select a channel which you want to use for the TTS and register it with `?setchannel <channel>`

4. Every member who wants to use a specific voice has to register that role with `?register <role>`

5. Write in the registered channel while in a voice channel. No prefix needed!

## Want to contribute?

Check out the [contributing guide][contributing]

[contributing]: CONTRIBUTING.md
[invite]: https://discord.com/api/oauth2/authorize?client_id=766259584040960001&permissions=271608896&scope=bot