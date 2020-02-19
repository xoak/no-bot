const { Client, RichEmbed } = require('discord.js');
const client = new Client();
const googleIt = require('google-it');

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

var timer = setInterval(playSong, 60000);

function playSong() {
    var songs = Object.keys(songQueue);
    if (songs.length > 0){
        let videoID = songs[0];
        client.channels.get('498871309862830081').send('$play https://www.youtube.com/watch?v=' + videoID);
        delete songQueue[videoID];
    }
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

    if (msg.content.startsWith('!play ')){
        //protection from noah
        curTime = new Date().getTime() / 1000;
        //play direct link
        if (msg.content.startsWith('!play https://www.youtube.com/watch?v=') && msg.content.length === 49){
            let videoID = msg.content.slice(38);
            if (curTime - lastPlayRequest > 60 && Object.keys(songQueue).length === 0){
                msg.channel.send('$' + msg.content.slice(1));
                msg.channel.send('Playing your song now.');
            } else if (videoID in songQueue){
                songQueue[videoID]++;
                msg.channel.send('Song will queue in 60 seconds.');
            } else {
                songQueue[videoID] = 1;
                msg.channel.send('Song will queue in 60 seconds.');
            }
            lastPlayRequest = curTime;
            console.log(songQueue);
        } else if (msg.content.startsWith('!play http')){
            msg.reply('I can\'t process non-video URL\'s yet.');
        //search
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
                        msg.reply('Can\'t do playlists.  I\'ll get banned.');
                    } else if (results[0].link.startsWith('https://www.youtube.com/watch?v=')){
                        let videoID = results[0].link.slice(32,43);
                        console.log(typeof(videoID));
                        console.log(curTime);
                        console.log(lastPlayRequest);
                        if (curTime - lastPlayRequest > 60 && Object.keys(songQueue).length === 0){
                            msg.channel.send('$play ' + results[0].link.slice(0,43));
                            msg.channel.send('Playing your song now.');
                        } else if (videoID in songQueue){
                            songQueue[videoID]++;
                            msg.channel.send('Song will queue in 60 seconds.');
                        } else {
                            songQueue[videoID] = 1;
                            msg.channel.send('Song will queue in 60 seconds.');
                        }
                        lastPlayRequest = curTime;
                    } else {
                        msg.reply('Search returned a playlist. Try changing your search string.');
                    }
                }).catch(e => {
                // any possible errors that might have occurred (like no Internet connection)
            })
        }
    }
});

//var games = {};

// client.on('presenceUpdate', (oldMember, newMember) => {
//     const channel = newMember.guild.channels.find(ch => ch.name === 'bots');

//     if (newMember.presence.game){
//         console.log(newMember.presence.game);

//         console.log(newMember.user.tag + ': ' + newMember.presence.game.name);
//         if (newMember.user.tag in games){
//             console.log('user already in games');
//         } else {
//             games[newMember.user.tag] = { [newMember.presence.game.name]: newMember.presence.game.timestamps.start};
//             console.log('user added to games');
//             console.log(games);
//             //console.log(games['base#0525'][Spectacle]);
//             console.log(games['base#0525']['Spectacle']);
//         }
//     } else {
//         console.log(newMember.presence.status + ' no game');
//     }
    
// });

client.login(process.env.BOT_TOKEN);