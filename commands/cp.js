const noahId = '229419764315848704';

module.exports = {
	name: 'cp',
	description: 'Trolls Noah',
	execute(message, args) {
        let noah = message.author.id === noahId;
		if (message.client.cp_rand === message.client.cp_count && noah) {
            message.reply('no u');
            message.client.cp_count = 0;
            console.log(message.client.cp_count);
            message.client.cp_rand = Math.floor((Math.random() * 10) + 1);
        } else if (noah) {
            message.client.cp_count++;
            console.log(message.client.cp_count);
        } else {
            console.log('nah');
        }       
	},
}