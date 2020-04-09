module.exports = function clear(message) {
    message.client.songQueue = {};
    message.channel.send('Queue has been cleared.');
    console.log(message.client.songQueue);
};