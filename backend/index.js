const config = require('./config')
const logger = require('./logger')
const express = require('express')
const morgan = require('morgan')
const middleware = require('./middleware')
const routes = require('./routes')

// connect to MongoDB
require('./repository')

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
app.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}`)
})
