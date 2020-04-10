module.exports = function next(message) {
    var songs = Object.keys(message.client.songQueue);
    if (songs.length > 0){
        let videoID = songs[0];
        let voiceChannel = message.client.channels.cache.get('228406262298050571');
        voiceChannel.join()
            .then(connection => {
                url = 'https://www.youtube.com/watch?v=' + videoID;
                message.client.music.stream(connection, url, videoID, message);
                message.client.playing = true;
                message.client.currVideoID = videoID;
            });
    } else {
        console.log('queue is empty');
    }
};