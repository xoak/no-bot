module.exports = {
    remove: function remove(videoID, message) {
        delete message.client.songQueue[videoID];
    },
    add: function add(videoID, message) {
        message.client.songQueue[videoID] = 1;
    }
};