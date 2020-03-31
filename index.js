const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const googleIt = require('google-it');
const ytpl = require('ytpl');
const ytscrape = require('scrape-youtube');

var functions = require('./functions');
 
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

cp_rand = Math.floor((Math.random() * 10) + 1);
console.log(cp_rand);
cp_count = 0;

msg_rand = Math.floor((Math.random() * 100) + 1);
msg_count = 0;

client.songQueue = {};
client.lastPlayRequest = 0;
client.playing = false;
client.currVideoID = 0;

function addToQueue(videoID) {
    client.songQueue[videoID] = 1;
}

client.on('message', msg => {
    if (msg.content.toLowerCase().includes(' cp')) {
        if (cp_rand === cp_count) {
            msg.reply('no u');
            cp_count = 0;
            cp_rand = Math.floor((Math.random() * 10) + 1);
        } else {
            cp_count++;
            console.log(cp_count);
        }
    }
    if (msg.content === '!id') {
        msg.channel.send('no-bot');
    }

    if (msg.content.startsWith('!google ')){
        const options = {};
        search = msg.content.slice(8);
        googleIt({options, 
                'query': search,
                'only-urls': false,
                'limit': '5'
            }).then(results => {
                console.log(results);
                const embed = new MessageEmbed()
                    .setTitle(results[0].title)
                    .setURL(results[0].link)
                    .setDescription(results[0].snippet)
                    .setFooter(results[0].link);
                msg.channel.send(embed);
        }).catch(e => {
            // any possible errors that might have occurred (like no Internet connection)
        })
    }

    if (msg.content.startsWith('!playlist ')){
        if (msg.content.startsWith('!playlist https://www.youtube.com/playlist?list=P')){
            //do playlist stuff
            playlistID = msg.content.slice(48);
            console.log(playlistID);
            ytpl(playlistID, function(err, playlist) {
                if(err) throw err;
                //console.log(playlist.items.length);
                for (item in playlist.items){
                  let videoID = playlist.items[item].id;
                  addToQueue(videoID);
                  //console.log(playlist.items[item].id);
                }
                msg.channel.send('Playlist is being queued.');
                console.log(client.songQueue);
                if (!client.playing) functions.playSong(client);
            });
        } else {
            msg.reply('That does not look like a playlist link.');
        }
    }

    if (msg.content.startsWith('!clear')){
        client.songQueue = {};
        msg.channel.send('Queue has been cleared.');
        console.log(client.songQueue);
    }

    if (msg.content.startsWith('!replay')){
        msg.channel.send('Replaying song.');
        functions.replay(client);
    }

    if (msg.content.startsWith('!skip')){
        queue = Object.keys(client.songQueue).length;
        if (queue === 0) {
            console.log('queue empty');
            let voiceChannel = client.channels.cache.get('228406262298050571');
            voiceChannel.leave();
            client.playing = false;
            console.log(client.songQueue);
        } else {
            console.log(client.songQueue);
            functions.playSong(client);
        }
    }

    if (msg.content.startsWith('!play ')){
        //protection from noah
        //play direct link
        if (msg.content.startsWith('!play https://www.youtube.com/watch?v=') && msg.content.length === 49){
            let videoID = msg.content.slice(38);
            //add url to queue
            addToQueue(videoID);
            if (!client.playing) functions.playSong(client);
            console.log(client.songQueue);
        } else {
            let search = msg.content.slice(6);
            console.log(search);
            ytscrape.search(search, {
                limit : 1,
                type : 'video'
            }).then(function(results){
                console.log(results);
                let videoID = results[0].link.slice(28,39);
                let title = results[0].title;
                if (videoID === 'ww.googlead') {
                    msg.channel.send('try something else: ' + '`' + search + '`');
                    msg.channel.send('```' + results[0].link + '```');
                } else {
                    console.log(videoID);
                    addToQueue(videoID);
                    msg.channel.send('Adding `' + title + '` to the queue.');
                    console.log(client.songQueue);
                    if (!client.playing) functions.playSong(client);
                }
            }, function(err){
                console.log(err);
            });
        }
    }
});

client.login(process.env.BOT_TOKEN);