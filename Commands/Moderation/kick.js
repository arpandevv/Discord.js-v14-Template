const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embeds = require('../../Utils/Embeds');

module.exports = {
    userPermissions: [PermissionFlagsBits.KickMembers],
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member from the server.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The member to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking')),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        if (!target) {
            return interaction.reply({ embeds: [Embeds.error('Could not find that member.')], ephemeral: true });
        }

        if (!target.kickable) {
            return interaction.reply({ embeds: [Embeds.error('I cannot kick this member. They might have a higher role than me.')], ephemeral: true });
        }

        await target.kick(reason);
        await interaction.reply({ embeds: [Embeds.success(`Successfully kicked **${target.user.tag}** for: ${reason}`)] });
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
