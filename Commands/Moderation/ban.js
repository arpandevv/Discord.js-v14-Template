const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embeds = require('../../Utils/Embeds');

module.exports = {
    userPermissions: [PermissionFlagsBits.BanMembers],
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member from the server.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning')),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        if (!target) {
            return interaction.reply({ embeds: [Embeds.error('Could not find that member.')], ephemeral: true });
        }

        if (!target.bannable) {
            return interaction.reply({ embeds: [Embeds.error('I cannot ban this member. They might have a higher role than me.')], ephemeral: true });
        }

        await target.ban({ reason });
        await interaction.reply({ embeds: [Embeds.success(`Successfully banned **${target.user.tag}** for: ${reason}`)] });
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
