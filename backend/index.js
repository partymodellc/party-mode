const config = require('./config')
const logger = require('./logger')
const express = require('express')
const morgan = require('morgan')
const middleware = require('./middleware')
const routes = require('./routes')
const mongoose = require('mongoose')

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

// other
app.get('/', (req, res) => {
    res.send("Welcome to Party Modd Server...")
})
app.use('/storage', express.static('Storage'))
app.get('/storage/*', function (req, res) {
    res.sendFile(__dirname + '/public/error.html')
})
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/error.html')
})

mongoose.connect(config.mongo.connectionString, {
    dbName: config.mongo.databaseName,
    autoIndex: false
}).then(() => {
    logger.debug("Connected to MongoDB")
}).catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error}`)
})

// start server
app.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}`)
})
