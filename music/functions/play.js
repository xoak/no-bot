const ytdl = require('ytdl-core-discord');

module.exports = async function play(connection, url, videoID, client) {
    const dispatcher = connection.play(await ytdl(url, {
        quality: 'highestaudio',
        highWaterMark: 1<<25
    }), { 
        type: 'opus',
        highWaterMark: 1
    });
    client.music.queue.remove(videoID, client);
    dispatcher.on('finish', () => {
        client.playing = false;
        client.currVideoID = 0;
        client.music.playSong(client);                  
    });
};