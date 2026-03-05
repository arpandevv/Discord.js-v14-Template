const { ActivityType } = require('discord.js');
const logger = require('./Logger');

class PresenceManager {
    constructor(client) {
        this.client = client;
        this.activities = [
            { name: 'made with 💗 by arpandevv', type: ActivityType.Watching },
            { name: '/help for commands', type: ActivityType.Listening },
            { name: 'over {guilds} servers', type: ActivityType.Watching },
            { name: 'Advanced v14 Template', type: ActivityType.Playing }
        ];
        this.current = 0;
    }

    start(interval = 60000) {
        this.update();
        setInterval(() => this.update(), interval);
        logger.info('Presence rotation started.');
    }

    update() {
        const activity = this.activities[this.current];
        const name = activity.name.replace('{guilds}', this.client.guilds.cache.size);

        this.client.user.setActivity({
            name: name,
            type: activity.type
        });

        this.current = (this.current + 1) % this.activities.length;
    }
}

module.exports = PresenceManager;

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
