exports.replay = function replay(client) {
    if (client.playing){
        let voiceChannel = client.channels.cache.get('228406262298050571');
        videoID = client.currVideoID;
        voiceChannel.join()
            .then(connection => {
                url = 'https://www.youtube.com/watch?v=' + videoID;
                client.music.play(connection, url, videoID, client);
                client.playing = true;
            });
    } else {
        console.log('no song to replay');
    }
};