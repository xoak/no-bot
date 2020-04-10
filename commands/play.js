module.exports = {
	name: 'play',
	description: 'Plays a song from search string or URL',
	execute(message) {
        message.client.music.play(message);
	},
};