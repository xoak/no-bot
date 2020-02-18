const Discord = require('discord.js');
const client = new Discord.Client();
const googleIt = require('google-it');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

cp_rand = Math.floor((Math.random() * 10) + 1);
console.log(cp_rand);
cp_count = 0;

msg_rand = Math.floor((Math.random() * 100) + 1);
msg_count = 0;

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
    if (msg.content.startsWith('!play ')){
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
                //32+11
                if (results[0].link.includes('playlist')){
                    msg.reply('Can\'t do playlists.  I\'ll get banned.');
                } else {
                    msg.channel.send('$play ' + results[0].link.slice(0,43));
                }
            }).catch(e => {
            // any possible errors that might have occurred (like no Internet connection)
          })
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