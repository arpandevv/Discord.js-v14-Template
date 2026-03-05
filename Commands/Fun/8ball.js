const { SlashCommandBuilder } = require('discord.js');
const Embeds = require('../../Utils/Embeds');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8-ball a question.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask')
                .setRequired(true)),
    async execute(interaction) {
        const responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes – definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            "Don't count on it.",
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];

        const question = interaction.options.getString('question');
        const answer = responses[Math.floor(Math.random() * responses.length)];

        await interaction.reply({
            embeds: [Embeds.info(`**Question:** ${question}\n**Answer:** ${answer}`, '🔮 Magic 8-Ball')]
        });
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
