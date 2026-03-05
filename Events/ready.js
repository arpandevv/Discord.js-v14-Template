const { Events } = require('discord.js');
const logger = require('../Utils/Logger');
const PresenceManager = require('../Utils/PresenceManager');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        const line = '━'.repeat(40);
        console.log(`\x1b[35m${line}\x1b[0m`);
        logger.info(`AUTHENTICATED AS : ${client.user.tag}`);
        logger.info(`SERVER COUNT     : ${client.guilds.cache.size}`);
        logger.info(`STATUS           : Online & Protected`);
        console.log(`\x1b[35m${line}\x1b[0m`);

        // Start Presence Rotation
        const presence = new PresenceManager(client);
        presence.start();
    },
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
