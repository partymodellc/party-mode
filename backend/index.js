const config = require('./config')
const logger = require('./logger')
const express = require('express')
const morgan = require('morgan')
const middleware = require('./middleware')
const routes = require('./routes')
const mongoose = require('mongoose').default

// create server
const app = express()

// configure server logger
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            write: (message) => logger.http(message.trim()),
        }
    }))

// configure middleware
middleware.configure(app)

// configure routes
routes.configure(app)

// start server
// connect to MongoDB
mongoose.set('strictQuery', false)
mongoose.connect(config.mongo.connectionString, {
    dbName: config.mongo.databaseName,
    autoIndex: false,
}, function (err) {
    if (err && err instanceof Error) {
        throw new Error(`Error connecting to MongoDB: ${err.message}`)
    }

    logger.debug("Connected to MongoDB")

    app.listen(config.port, '127.0.0.1', () => {
        logger.info(`Express server listening on port ${config.port} in mode ${config.nodeEnv}`)
    })
})

