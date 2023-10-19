const config = require('../config')
const winston = require('winston')
const {format} = winston

let logLevel = config.logLevel

if (config.nodeEnv === 'production') {
    logLevel = 'http'
}

const logger = winston.createLogger({
    level: logLevel,
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A', // 2022-01-25 03:23:10.350 PM
    }), format.json()),
    transports: [new winston.transports.Console()],
})

module.exports = logger