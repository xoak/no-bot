module.exports = {
	name: 'clear',
	description: 'Clears the song queue',
	execute(message, args) {
		message.client.songQueue = {};
        message.channel.send('Queue has been cleared.');
        console.log(message.client.songQueue);
	},
};