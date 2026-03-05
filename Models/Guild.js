const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: '/' },
    welcomeChannel: { type: String, default: null },
    logChannel: { type: String, default: null },
});

module.exports = mongoose.model('Guild', guildSchema);

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
