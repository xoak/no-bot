
//const functions = require('../music/functions');

module.exports = {
	name: 'playlist',
	description: 'Adds a YouTube playlist to the queue',
	execute(message) {
        let args = message.content.slice(10);
		if (args.startsWith('https://www.youtube.com/playlist?list=P')){
            //do playlist stuff
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
        } else {
            message.reply('That does not look like a playlist link.');
        }
	},
};