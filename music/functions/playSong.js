const ytscrape = require('scrape-youtube');

module.exports = function playSong(message) {
    let args = message.content.slice(6);
    if (args.startsWith('https://www.youtube.com/watch?v=') && message.content.length === 43){
        let videoID = args.slice(32);
        //add url to queue
        message.client.music.queue.add(videoID, message);
        if (!message.client.playing) message.client.music.next(message);
        console.log(message.client.songQueue);
    } else {
        //search
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
                message.client.music.queue.add(videoID, message);
                message.channel.send('Adding `' + title + '` to the queue.');
                console.log(message.client.songQueue);
                if (!message.client.playing) message.client.music.next(message);
            }
        }, function(err){
            console.log(err);
        });
    }
};