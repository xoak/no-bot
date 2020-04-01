const googleIt = require('google-it');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'google',
	description: 'Google Search',
	execute(message, args) {
		const options = {};
        search = args;
        googleIt({options, 
                'query': search,
                'only-urls': false,
                'limit': '5'
            }).then(results => {
                console.log(results);
                let embed = new MessageEmbed()
                    .setTitle(results[0].title)
                    .setURL(results[0].link)
                    .setDescription(results[0].snippet)
                    .setFooter(results[0].link);
                message.channel.send(embed);
        }).catch(e => {
            // any possible errors that might have occurred (like no Internet connection)
        })
	},
};