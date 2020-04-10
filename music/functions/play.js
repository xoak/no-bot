module.exports = function play(message) {
    let args = message.content.replace(/^[\S]+[\s]+/, '');
    if (args.startsWith('https://www.youtube.com/watch?v=') && message.content.length === 43){
        let videoID = args.slice(32);
        //add url to queue
        message.client.music.queue.add(videoID, message);
        if (!message.client.playing) message.client.music.next(message);
        console.log(message.client.songQueue);
    } else {
        //search
        message.client.music.search(message);
    }
};