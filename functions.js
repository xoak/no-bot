const ytdl = require('ytdl-core-discord');

exports.replay = function replay(client) {
    if (client.playing){
        let voiceChannel = client.channels.cache.get('228406262298050571');
        videoID = client.currVideoID;
        voiceChannel.join()
            .then(connection => {
                url = 'https://www.youtube.com/watch?v=' + videoID;
                exports.play(connection, url, videoID, client);
                client.playing = true;
            });
    } else {
        console.log('no song to replay');
    }
};

exports.play = async function play(connection, url, videoID, client) {
    const dispatcher = connection.play(await ytdl(url, {
        quality: 'highestaudio',
        highWaterMark: 1<<25
    }), { 
        type: 'opus',
        highWaterMark: 1
    });
    exports.removeFromQueue(videoID, client);
    dispatcher.on('finish', () => {
        client.playing = false;
        client.currVideoID = 0;
        exports.playSong(client);                  
    });
};

exports.removeFromQueue = function removeFromQueue(videoID, client) {
    delete client.songQueue[videoID];
};

exports.playSong = function playSong(client) {
    var songs = Object.keys(client.songQueue);
    if (songs.length > 0){
        let videoID = songs[0];
        let voiceChannel = client.channels.cache.get('228406262298050571');
        voiceChannel.join()
            .then(connection => {
                url = 'https://www.youtube.com/watch?v=' + videoID;
                exports.play(connection, url, videoID, client);
                client.playing = true;
                client.currVideoID = videoID;
            });
    } else {
        console.log('queue is empty');
    }
}