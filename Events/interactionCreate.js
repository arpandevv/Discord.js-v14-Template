const { Events, Collection } = require('discord.js');
const Embeds = require('../Utils/Embeds');
const logger = require('../Utils/Logger');
const i18n = require('../Utils/i18n');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        // Autocomplete Handling
        if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                logger.error(`Error during autocomplete for ${interaction.commandName}:`, error);
            }
            return;
        }

        // Chat Input Command Handling
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            // Permission Check
            if (command.userPermissions) {
                if (!interaction.member.permissions.has(command.userPermissions)) {
                    return interaction.reply({
                        embeds: [Embeds.error(i18n.__('NO_PERMISSION', { permissions: command.userPermissions.join(', ') }))],
                        ephemeral: true
                    });
                }
            }

            // Cooldown System
            const { cooldowns } = client;
            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    return interaction.reply({
                        embeds: [Embeds.warning(i18n.__('COOLDOWN_MESSAGE', {
                            command: command.data.name,
                            time: `<t:${expiredTimestamp}:R>`
                        }))],
                        ephemeral: true
                    });
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await command.execute(interaction, client);
            } catch (error) {
                logger.error(`Error executing ${interaction.commandName}:`, error);
                const content = { embeds: [Embeds.error(i18n.__('COMMAND_ERROR'))], ephemeral: true };
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(content);
                } else {
                    await interaction.reply(content);
                }
            }
            return;
        }

        // Component Handling (Buttons, Menus, Modals)
        let component;
        if (interaction.isButton()) component = client.buttons.get(interaction.customId);
        else if (interaction.isStringSelectMenu()) component = client.selectMenus.get(interaction.customId);
        else if (interaction.isModalSubmit()) component = client.modals.get(interaction.customId);

        if (component) {
            try {
                await component.execute(interaction, client);
            } catch (error) {
                logger.error(`Error executing component ${interaction.customId}:`, error);
            }
        }
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
