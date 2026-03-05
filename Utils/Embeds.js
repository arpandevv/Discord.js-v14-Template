const { EmbedBuilder } = require('discord.js');

class Embeds {
    static success(description, title = '✅ Success') {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor('#2ECC71')
            .setTimestamp();
    }

    static error(description, title = '❌ Error') {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor('#E74C3C')
            .setTimestamp();
    }

    static info(description, title = 'ℹ️ Information') {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor('#3498DB')
            .setTimestamp();
    }

    static warning(description, title = '⚠️ Warning') {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor('#F1C40F')
            .setTimestamp();
    }
}

module.exports = Embeds;

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
