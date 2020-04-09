//const functions = require('../music/functions');

module.exports = {
	name: 'skip',
	description: 'Skips current song',
	execute(message) {
		message.client.music.skip(message);
	}
};