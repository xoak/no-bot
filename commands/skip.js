const functions = require('../functions');

module.exports = {
	name: 'skip',
	description: 'Skips current song',
	execute(message, args) {
		let queue = Object.keys(message.client.songQueue).length;
        if (queue === 0) {
            console.log('queue empty');
            let voiceChannel = message.client.channels.cache.get('228406262298050571');
            voiceChannel.leave();
            message.client.playing = false;
            console.log(message.client.songQueue);
        } else {
            console.log(message.client.songQueue);
            functions.playSong(message.client);
        }
	},
};