# SpeasierJS

Welcome to Speasier in it's Javascript variant. 

This bot allows you to use Amazons Polly TTS engine so that you may speak without actually speaking.

For this to work you need to have a number of roles on your discord server, corresponding with the voices available with Polly.

Those voices include, but are not [limited](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html) to: "Salli", "Joanna", "Ivy", "Kendra", "Kimberly", "Matthew", "Justin", "Nicole", "Russell", "Amy", "Emma", "Brian", "Raveena", "Aditi", "Geraint", "Joey". This bot also includes a command to create these roles for you. You can add new Voices from the list of available ones.

The prefix for this bot is `?` and it includes a `?help` command where you can see all other commands. Commands under the `admin` category require server administrator permissions to execute.

## How to setup

1. Create the voice roles

2. Select a channel which you want to use for the TTS and register it with `?setchannel <channel>`

3. Every member who wants to use a specific voice has to register that role with `?register <role>`

4. Write in the registered channel. No prefix needed!

## Want to contribute?

Check out the [contributing guide][contributing]

[contributing]: CONTRIBUTING.md