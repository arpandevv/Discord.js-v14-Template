const fs = require('fs');
const path = require('path');
const logger = require('../Utils/Logger');

module.exports = (client) => {
    const componentsPath = path.join(__dirname, '../Components');
    const componentFolders = fs.readdirSync(componentsPath);

    for (const folder of componentFolders) {
        const folderPath = path.join(componentsPath, folder);
        if (!fs.lstatSync(folderPath).isDirectory()) continue;

        const componentFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of componentFiles) {
            const filePath = path.join(folderPath, file);
            const component = require(filePath);

            if (!component.customId || !component.execute) {
                logger.warn(`The component at ${filePath} is missing a required "customId" or "execute" property.`);
                continue;
            }

            switch (folder.toLowerCase()) {
                case 'buttons':
                    client.buttons.set(component.customId, component);
                    break;
                case 'menus':
                    client.selectMenus.set(component.customId, component);
                    break;
                case 'modals':
                    client.modals.set(component.customId, component);
                    break;
                default:
                    logger.warn(`Unknown component category: ${folder}`);
            }
            logger.info(`Loaded ${folder.slice(0, -1)}: ${component.customId}`);
        }
    }
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
