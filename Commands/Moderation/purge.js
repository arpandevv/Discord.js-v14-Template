const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Embeds = require('../../Utils/Embeds');

module.exports = {
    userPermissions: [PermissionFlagsBits.ManageMessages],
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes a specified amount of messages.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to delete (1-100)')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        await interaction.channel.bulkDelete(amount, true).then(messages => {
            interaction.reply({
                embeds: [Embeds.success(`Successfully deleted \`${messages.size}\` messages.`)],
                ephemeral: true
            });
        }).catch(err => {
            interaction.reply({
                embeds: [Embeds.error('There was an error trying to purge messages in this channel!')],
                ephemeral: true
            });
        });
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
