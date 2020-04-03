const { Client, Collection } = require('discord.js');
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

client.cp_rand = Math.floor((Math.random() * 10) + 1);
console.log(client.cp_rand);
client.cp_count = 0;

client.songQueue = {};
client.playing = false;
client.currVideoID = 0;

client.on('message', message => {
    if (message.content === '!ping'){
        client.commands.get('ping').execute(message);
    }
    if (message.content.toLowerCase().includes(' cp')) {
        client.commands.get('cp').execute(message);
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
        client.commands.get('clear').execute(message);
    }
    if (message.content.startsWith('!replay')){
        client.commands.get('replay').execute(message);
    }
    if (message.content.startsWith('!skip')){
        client.commands.get('skip').execute(message);
    }
    if (message.content.startsWith('!play ')){
        let args = message.content.slice(6);
       client.commands.get('play').execute(message, args);
    }
});

client.login(process.env.BOT_TOKEN);