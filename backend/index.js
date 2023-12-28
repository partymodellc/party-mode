const config = require('./config')
const logger = require('./logger')
const express = require('express')
const morgan = require('morgan')
const middleware = require('./middleware')
const routes = require('./routes')
const repository = require('./repository')

const initServer = function () {
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
    app.listen(config.port, '0.0.0.0', () => {
        logger.info(`Express server listening on port ${config.port} in mode ${config.nodeEnv}`)
    })
}

repository.configure(initServer)