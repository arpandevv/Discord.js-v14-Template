const fs = require('fs');
const path = require('path');
const logger = require('./Logger');

class i18n {
    constructor() {
        this.locales = new Map();
        this.defaultLocale = 'en';
        this.loadLocales();
    }

    loadLocales() {
        const localesPath = path.join(__dirname, '../Locales');
        if (!fs.existsSync(localesPath)) {
            fs.mkdirSync(localesPath);
        }

        const files = fs.readdirSync(localesPath).filter(f => f.endsWith('.json'));
        for (const file of files) {
            const localeName = file.split('.')[0];
            try {
                const content = JSON.parse(fs.readFileSync(path.join(localesPath, file), 'utf8'));
                this.locales.set(localeName, content);
                logger.info(`Loaded locale: ${localeName}`);
            } catch (error) {
                logger.error(`Error loading locale ${localeName}:`, error);
            }
        }
    }

    translate(key, locale = this.defaultLocale, placeholders = {}) {
        const translations = this.locales.get(locale) || this.locales.get(this.defaultLocale);
        if (!translations) return key;

        let message = translations[key] || key;

        Object.keys(placeholders).forEach(placeholder => {
            message = message.replace(`{${placeholder}}`, placeholders[placeholder]);
        });

        return message;
    }

    __(key, placeholders = {}) {
        return this.translate(key, this.defaultLocale, placeholders);
    }
}

module.exports = new i18n();

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
