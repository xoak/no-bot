const functions = require('../functions');

module.exports = {
	name: 'replay',
	description: 'Replays current song',
	execute(message, args) {
		message.channel.send('Replaying song.');
        functions.replay(message.client);
	},
};