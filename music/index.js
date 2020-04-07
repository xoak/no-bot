'use strict';

module.exports = {
    init: function init(client) {
        client.songQueue = {};
        client.playing = false;
        client.currVideoID = 0;
    }
};
