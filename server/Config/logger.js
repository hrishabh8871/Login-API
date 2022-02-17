const { createLogger,transports,format } = require('winston');
require('winston-mongodb');
const { MONGODBURL } = require('./config')

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),

        new transports.MongoDB({
            level: 'error',
            db: MONGODBURL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'Log',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;
