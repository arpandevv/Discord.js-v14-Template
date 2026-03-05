const { SlashCommandBuilder } = require('discord.js');
const Embeds = require('../../Utils/Embeds');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and latency!'),
    async execute(interaction, client) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);

        await interaction.editReply({
            content: null,
            embeds: [Embeds.success(`🏓 Pong!\n\n**Latency:** \`${latency}ms\`\n**API Latency:** \`${apiLatency}ms\``)]
        });
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
