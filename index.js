const { Client, Collection } = require('discord.js');
const client = new Client();
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { prefix, token } = require('./config/config.json');

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
    if (message.content.toLowerCase().includes(' cp')) {
        client.commands.get('cp').execute(message);
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const command = message.content.slice(prefix.length).split(/ +/)[0].toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }

});

client.login(token);