module.exports = function playSong(client) {
    var songs = Object.keys(client.songQueue);
    if (songs.length > 0){
        let videoID = songs[0];
        let voiceChannel = client.channels.cache.get('228406262298050571');
        voiceChannel.join()
            .then(connection => {
                url = 'https://www.youtube.com/watch?v=' + videoID;
                client.music.play(connection, url, videoID, client);
                client.playing = true;
                client.currVideoID = videoID;
            });
    } else {
        console.log('queue is empty');
    }
};