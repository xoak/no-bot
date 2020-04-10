const ytscrape = require('scrape-youtube');

module.exports = function search(message) {
    let query = message.content.replace(/^[\S]+[\s]+/, '');
    console.log(query);
    ytscrape.search(query, {
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
};