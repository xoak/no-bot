const ytscrape = require('scrape-youtube').default;

module.exports = function search(message) {
    let query = message.content.replace(/^[\S]+[\s]+/, '');
    console.log(query);
    ytscrape.searchOne(query, {
        type : 'video'
    }).then(function(results){
        console.log(results);
        let videoID = results.id;
        let title = results.title;
        console.log(videoID);
        message.client.music.queue.add(videoID, message);
        message.channel.send('Adding `' + title + '` to the queue.');
        console.log(message.client.songQueue);
        if (!message.client.playing) message.client.music.next(message);
    }, function(err){
        console.log(err);
    });
};