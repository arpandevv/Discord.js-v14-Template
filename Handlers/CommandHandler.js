const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const logger = require('../Utils/Logger');

module.exports = async (client) => {
    const commands = [];
    const commandsPath = path.join(__dirname, '../Commands');
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        if (!fs.lstatSync(folderPath).isDirectory()) continue;

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
                logger.info(`Loaded command: ${command.data.name}`);
            } else {
                logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        logger.info(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        logger.error('Error deploying commands:', error);
    }
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
