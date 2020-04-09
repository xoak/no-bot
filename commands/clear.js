module.exports = {
	name: 'clear',
	description: 'Clears the song queue',
	execute(message) {
        message.client.music.clear(message);
	},
};