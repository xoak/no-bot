const functions = require('../functions');
const ytscrape = require('scrape-youtube');

module.exports = {
	name: 'play',
	description: 'Plays a song from search string or URL',
	execute(message, args) {
		 //protection from noah
        //play direct link
        if (args.startsWith('https://www.youtube.com/watch?v=') && message.content.length === 43){
            let videoID = args.slice(32);
            //add url to queue
            functions.addToQueue(videoID, message.client);
            if (!message.client.playing) functions.playSong(message.client);
            console.log(message.client.songQueue);
        } else {
            let search = args;
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
                    functions.addToQueue(videoID, message.client);
                    message.channel.send('Adding `' + title + '` to the queue.');
                    console.log(message.client.songQueue);
                    if (!message.client.playing) functions.playSong(message.client);
                }
            }, function(err){
                console.log(err);
            });
        }
	},
};