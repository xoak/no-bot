module.exports = function skip(message) {
    let queue = Object.keys(message.client.songQueue).length;
        if (queue === 0) {
            console.log('queue empty');
            message.channel.send('No songs to play. Goodbye');
            let voiceChannel = message.client.channels.cache.get('228406262298050571');
            voiceChannel.leave();
            message.client.playing = false;
            console.log(message.client.songQueue);
        } else {
            message.channel.send('Skipped.');
            console.log('song skipped');
            console.log(message.client.songQueue);
            message.client.music.next(message);
        }
};