const ytpl = require('ytpl');

function playlist(message){
    let playlistID = message.content.slice(38);
    console.log(playlistID);
    ytpl(playlistID, function(err, playlist) {
        if(err) throw err;
        //console.log(playlist.items.length);
        for (item in playlist.items){
            let videoID = playlist.items[item].id;
            message.client.music.queue.add(videoID, message);
            //console.log(playlist.items[item].id);
        }
        message.channel.send('Playlist is being queued.');
        console.log(message.client.songQueue);
        if (!message.client.playing) message.client.music.next(message);
    });
}


module.exports = function play(message) {
    let args = message.content.replace(/^[\S]+[\s]+/, '');
    //direct link
    if (args.startsWith('https://www.youtube.com/watch?v=')){
        let videoID = args.slice(32);
        //add url to queue
        message.client.music.queue.add(videoID, message);
        if (!message.client.playing) message.client.music.next(message);
        console.log(message.client.songQueue);
    //playlist
    } else if (args.startsWith('https://www.youtube.com/playlist?list=P')){
        playlist(message);
    //search
    } else {
        message.client.music.search(message);
    }
};