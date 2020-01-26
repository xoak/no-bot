const Discord = require('discord.js');
const client = new Discord.Client();

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
});

client.on('presenceUpdate', (oldMember, newMember) => {
    const channel = newMember.guild.channels.find(ch => ch.name === 'bots');

    if (newMember.presence.game !== oldMember.presence.game) {
        if (oldMember.presence.game === null) {
            channel.send(newMember.displayName + ' started playing ' + newMember.presence.game.name);
        } else if (newMember.presence.game !== null) {
            channel.send(newMember.displayName + ' stopped playing ' + oldMember.presence.game.name 
                        + ' and started playing ' + newMember.presence.game.name
                        + ' time ' + newMember.presence.game.timestamps.start);
        } else {
            channel.send(newMember.displayName + ' stopped playing ' + oldMember.presence.game.name);
        }
    }
});

client.login('');