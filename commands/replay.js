//const functions = require('../music/functions');

module.exports = {
	name: 'replay',
	description: 'Replays current song',
	execute(message) {
        message.client.music.replay(message);
	},
};