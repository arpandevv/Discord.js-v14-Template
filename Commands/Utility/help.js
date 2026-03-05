const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all available commands.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('📚 Bot Commands')
            .setDescription('Here is a list of all available slash commands:')
            .setColor('#3498DB')
            .setTimestamp();

        client.commands.forEach(command => {
            const name = command.data.name;
            const description = command.data.description;
            embed.addFields({ name: `/${name}`, value: description, inline: true });
        });

        await interaction.reply({ embeds: [embed] });
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
