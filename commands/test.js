module.exports = {
	name: 'test',
	description: 'test!',
	execute(message) {
		message.channel.send('test: ' + message.client.music.test());
	},
};