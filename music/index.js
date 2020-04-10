'use strict';

module.exports = {
    init: function init(client, voiceChannel) {
        client.songQueue = {};
        client.playing = false;
        client.currVideoID = 0;
        client.music = require('./functions/index');
        client.music.voiceChannel = voiceChannel;
    }
};
