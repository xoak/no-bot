const { Client, MessageEmbed, Collection } = require('discord.js');
const client = new Client();
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

cp_rand = Math.floor((Math.random() * 10) + 1);
console.log(cp_rand);
cp_count = 0;

msg_rand = Math.floor((Math.random() * 100) + 1);
msg_count = 0;

client.songQueue = {};
client.playing = false;
client.currVideoID = 0;

client.on('message', message => {
    if (message.content === '!ping'){
        let args = '';
        client.commands.get('ping').execute(message, args);
    }
    if (message.content.toLowerCase().includes(' cp')) {
        if (cp_rand === cp_count) {
            message.reply('no u');
            cp_count = 0;
            cp_rand = Math.floor((Math.random() * 10) + 1);
        } else {
            cp_count++;
            console.log(cp_count);
        }
    }
    if (message.content === '!id') {
        message.channel.send('no-bot');
    }
    if (message.content.startsWith('!google ')){
        let args = message.content.slice(8);
        client.commands.get('google').execute(message, args);
    }
    if (message.content.startsWith('!playlist ')){
        let args = message.content.slice(10);
        client.commands.get('playlist').execute(message, args);
    }
    if (message.content.startsWith('!clear')){
        let args = '';
        client.commands.get('clear').execute(message, args);
    }
    if (message.content.startsWith('!replay')){
        let args = '';
        client.commands.get('replay').execute(message, args);
    }
    if (message.content.startsWith('!skip')){
        let args = '';
        client.commands.get('skip').execute(message, args);
    }
    if (message.content.startsWith('!play ')){
        let args = message.content.slice(6);
       client.commands.get('play').execute(message, args);
    }
});

client.login(process.env.BOT_TOKEN);