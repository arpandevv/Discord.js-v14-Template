const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Example command with autocomplete.')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The item to search for')
                .setAutocomplete(true)
                .setRequired(true)),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
        const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue.toLowerCase()));

        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        const query = interaction.options.getString('query');
        await interaction.reply(`You searched for: **${query}**`);
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
