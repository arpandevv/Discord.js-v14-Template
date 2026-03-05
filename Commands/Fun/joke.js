const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const Embeds = require('../../Utils/Embeds');
const logger = require('../../Utils/Logger');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Tells a random joke.'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            const { setup, punchline } = response.data;

            await interaction.reply({
                embeds: [Embeds.info(`${setup}\n\n*${punchline}*`, '😂 Random Joke')]
            });
        } catch (error) {
            logger.error('Error fetching joke:', error);
            await interaction.reply({ embeds: [Embeds.error('Failed to fetch a joke. Please try again later.')], ephemeral: true });
        }
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
