# Documentation

Thank you for using Speasier as your TTS Bot of choice.
Speasier is a Text-to-speech bot that can talk for you! It features a number of unique voices provided by Amazons Polly API. It also tells you dadjokes if you mess up commands, ain't that a hoot?

**To use this bot you will need an AWS account!**

## Setup

1. Create the voice roles: 
    - `?createvoices`
2. Add your `AWS Access Key ID` and your `AWS Secret Access Key`:
    - `?setkeys <accessKeyID> <secretAccessKey>`
3. Select a channel which you want to use for the TTS and register it:
    - `?setchannel <channel>`
4. Every member who wants to use a specific voice has to register that role:
    - `?register <role>`
5. Write in the registered channel while in a voice channel. No prefix needed!


## Commands

Here are all the commands that Speasier provides. For your convenience they are split into four categories. Speasier will provide you this information in Discord by typing `?help`.

### Admin

- ?addvoice => Adds a voice to be used and creates the corresponding role. See ?voices for available voices to add.
- ?delchannel => Unregisters a text channel from the guild
- ?deleteconfig => Deletes everything related to TTS
- ?getchannel => Displays the current guild configuration
- ?createvoices => Creates the voice roles
- ?setkeys => Sets the access keys for AWS Polly. The message gets deleted immediatly and the keys encrypted.
- ?setchannel => Registers a text channel to listen too

### Info

- ?help => Returns this list
- ?voices => Displays all available voices

### User

- ?profile => Checks for a user profile
- ?register => Registers a voice to the user who sends it
- ?unregister => Unregisters a voice to the user who sends 

### Voice

- ?dadjoke => Sends a dadjoke
- ?leave => Disconnects the bot
