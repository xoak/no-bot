const ytpl = require('ytpl');

function playlist(message){
    let playlistID = message.content.slice(38);
    console.log(playlistID);
    ytpl(playlistID, function(err, playlist) {
        if(err) throw err;
        for (item in playlist.items){
            let videoID = playlist.items[item].id;
            message.client.music.queue.add(videoID, message);
        }
        message.channel.send('Playlist is being queued.');
        console.log(message.client.songQueue);
        if (!message.client.playing) message.client.music.next(message);
    });
}

module.exports = function play(message) {
    let args = message.content.replace(/^[\S]+[\s]+/, '');
    //direct link
    if (args.match(/^.*youtube.com\/watch\?v=\S{11}.*/i)){
        let videoID = args.split('?v=')[1].slice(0,11);
        console.log(videoID);
        message.client.music.queue.add(videoID, message);
        if (!message.client.playing) message.client.music.next(message);
        console.log(message.client.songQueue);
    } else if (args.match(/^.*youtu.be\/\S{11}.*/i)) {
        let videoID = args.split('be/')[1].slice(0,11);
        console.log(videoID);
        message.client.music.queue.add(videoID, message);
        if (!message.client.playing) message.client.music.next(message);
        console.log(message.client.songQueue);
    //playlist
    } else if (args.match(/^.*youtube.com\/playlist\?list=P\S*/i)){
        playlist(message);
    //search
    } else {
        message.client.music.search(message);
    }
};