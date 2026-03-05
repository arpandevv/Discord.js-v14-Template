const fs = require('fs');
const path = require('path');
const logger = require('../Utils/Logger');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../Events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        logger.info(`Loaded event: ${event.name}`);
    }
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
