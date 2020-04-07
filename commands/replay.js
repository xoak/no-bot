const functions = require('../music/functions');

module.exports = {
	name: 'replay',
	description: 'Replays current song',
	execute(message) {
		message.channel.send('Replaying song.');
        functions.replay(message.client);
	},
};