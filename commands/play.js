//const functions = require('../music/functions');
const ytscrape = require('scrape-youtube');

module.exports = {
	name: 'play',
	description: 'Plays a song from search string or URL',
	execute(message) {
		 //protection from noah
        //play direct link
        let args = message.content.slice(6);
        if (args.startsWith('https://www.youtube.com/watch?v=') && message.content.length === 43){
            let videoID = args.slice(32);
            //add url to queue
            message.client.music.addToQueue(videoID, message.client);
            if (!message.client.playing) message.client.music.playSong(message.client);
            console.log(message.client.songQueue);
        } else {
            let search = message.content.slice(6);;
            console.log(search);
            ytscrape.search(search, {
                limit : 1,
                type : 'video'
            }).then(function(results){
                console.log(results);
                let videoID = results[0].link.slice(28,39);
                let title = results[0].title;
                if (videoID === 'ww.googlead') {
                    message.channel.send('try something else: ' + '`' + search + '`');
                    message.channel.send('```' + results[0].link + '```');
                } else {
                    console.log(videoID);
                    message.client.music.addToQueue(videoID, message.client);
                    message.channel.send('Adding `' + title + '` to the queue.');
                    console.log(message.client.songQueue);
                    if (!message.client.playing) message.client.music.playSong(message.client);
                }
            }, function(err){
                console.log(err);
            });
        }
	},
};