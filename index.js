require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const logger = require('./Utils/Logger');
const commandHandler = require('./Handlers/CommandHandler');
const eventHandler = require('./Handlers/EventHandler');
const componentHandler = require('./Handlers/ComponentHandler');
const databaseHandler = require('./Handlers/Database');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

// Load Handlers
(async () => {
    logger.info('Starting Discord Bot Initialization...');
    try {
        await databaseHandler();
        eventHandler(client);
        componentHandler(client);
        await commandHandler(client);
    } catch (error) {
        logger.error('Initialization Error:', error);
    }
})();

// Error Handling
process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
});

client.login(process.env.DISCORD_TOKEN).catch((err) => {
    logger.error('Failed to login to Discord:', err);
});
