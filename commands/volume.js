module.exports = {
	name: 'volume',
	description: 'set/get volume of current stream',
	execute(message) {
        message.client.music.volume(message);
	},
};