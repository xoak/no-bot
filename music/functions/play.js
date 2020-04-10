const ytdl = require('ytdl-core-discord');

module.exports = async function play(connection, url, videoID, message) {
    const dispatcher = connection.play(await ytdl(url, {
        quality: 'highestaudio',
        highWaterMark: 1<<25
    }), { 
        type: 'opus',
        highWaterMark: 1
    });
    message.client.music.queue.remove(videoID, message);
    dispatcher.on('finish', () => {
        message.client.playing = false;
        message.client.currVideoID = 0;
        message.client.music.next(message);                  
    });
};