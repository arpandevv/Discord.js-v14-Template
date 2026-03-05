const mongoose = require('mongoose');
const logger = require('../Utils/Logger');

module.exports = async () => {
    if (!process.env.MONGODB_URI) {
        logger.warn('MONGODB_URI not found in .env, database features will be disabled.');
        return;
    }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('Successfully connected to MongoDB.');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
    }
};

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
