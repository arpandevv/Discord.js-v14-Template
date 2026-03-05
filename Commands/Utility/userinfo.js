const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to get info about')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
            .setTitle(`👤 User Info: ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Nickname', value: member.nickname || 'None', inline: true },
                { name: 'Joined Server', value: `<t:${Math.round(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: 'Joined Discord', value: `<t:${Math.round(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'Roles', value: member.roles.cache.map(r => r).join(' ') || 'None' }
            )
            .setColor('#3498DB')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
