const winston = require('winston');
const { format, transports } = winston;
const path = require('path');

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
        return stack
            ? `${timestamp} [${level}]: ${message}\n${stack}`
            : `${timestamp} [${level}]: ${message}`;
    })
);

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'Logs/error.log', level: 'error' }),
        new transports.File({ filename: 'Logs/combined.log' })
    ],
});

module.exports = logger;

/**
 * Credits: Arpan | Discord: @arpandevv
 * Please do star the repo 
 */
