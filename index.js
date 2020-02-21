const { Client, RichEmbed } = require('discord.js');
const client = new Client();
const googleIt = require('google-it');
const ytpl = require('ytpl');
const ytdl = require('ytdl-core');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

cp_rand = Math.floor((Math.random() * 10) + 1);
console.log(cp_rand);
cp_count = 0;

msg_rand = Math.floor((Math.random() * 100) + 1);
msg_count = 0;

songQueue = {};
lastPlayRequest = 0;

//var timer = setInterval(playSong, 150000);

function playSong() {
    var songs = Object.keys(songQueue);
    if (songs.length > 0){
        let videoID = songs[0];
        let voiceChannel = client.channels.get('228406262298050571');
        voiceChannel.join()
            .then(connection => {
                url = 'https://www.youtube.com/watch?v=J5nBEWAomyw';
                const stream = ytdl(url, { filter: 'audioonly'});
                const dispatcher = connection.playStream(stream);
                dispatcher.on('end', () => {
                    delete songQueue[videoID];
                    playSong();                    
                });
            });
    } else {
        console.log('queue is empty');
    }
}

function addToQueue(videoID) {
    songQueue[videoID] = 1;
}

function removeFromQueue(videoID) {
    delete songQueue[videoID];
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
                const embed = new RichEmbed()
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
        if (msg.content.startsWith('!playlist https://www.youtube.com/playlist?list=')){
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
                console.log(songQueue);
            });
        } else {
            msg.replay('That does not look like a playlist link.');
        }
    }

    if (msg.content.startsWith('!play ')){
        //protection from noah
        //curTime = new Date().getTime() / 1000;
        //play direct link
        if (msg.content.startsWith('!play https://www.youtube.com/watch?v=') && msg.content.length === 49){
            let videoID = msg.content.slice(38);
            //add url to queue
            addToQueue(videoID);
            console.log(songQueue);
        } else {
            let search = msg.content.slice(8);
            //console.log(search);
            const options = {};
            googleIt({options, 
                    'query': 'site:youtube.com ' + search, 
                    'limit': '5',
                    'only-urls': true
                }).then(results => {
                    // access to results object her
                    console.log(results[0].link);
                    if (results[0].link.includes('playlist')){
                        msg.reply('Use the !playlist command to queue playlists.');
                    } else if (results[0].link.startsWith('https://www.youtube.com/watch?v=')){
                        let videoID = results[0].link.slice(32,43);
                        console.log(typeof(videoID));
                        // add song to queue
                        addToQueue(videoID);

                    } else {
                        msg.reply('Search returned a playlist. Try changing your search string.');
                    }
                }).catch(e => {
                // any possible errors that might have occurred (like no Internet connection)
            })
        }
        playSong();
    }
});

client.login(process.env.BOT_TOKEN);