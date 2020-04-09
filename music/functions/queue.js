module.exports = {
    remove: function remove(videoID, client) {
        delete client.songQueue[videoID];
    },
    add: function add(videoID, client) {
        client.songQueue[videoID] = 1;
    }
};