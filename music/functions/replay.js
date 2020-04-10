module.exports = function replay(message) {
    if (message.client.playing){
        message.channel.send('Replaying song');
        let voiceChannel = message.client.channels.cache.get('228406262298050571');
        videoID = message.client.currVideoID;
        voiceChannel.join()
            .then(connection => {
                url = 'https://www.youtube.com/watch?v=' + videoID;
                message.client.music.stream(connection, url, videoID, message);
                message.client.playing = true;
            });
    } else {
        message.channel.send('No song to replay');
        console.log('no song to replay');
    }
};