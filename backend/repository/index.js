const config = require("../config")
const logger = require("../logger")
const mongoose = require('mongoose').default

mongoose.set('strictQuery', false)
mongoose.connect(config.mongo.connectionString, {
    dbName: config.mongo.databaseName,
    autoIndex: false,
}, function (err) {
    if (err && err instanceof Error) {
        throw new Error(`Error connecting to MongoDB: ${err.message}`)
    }

    logger.debug("Connected to MongoDB")
})
