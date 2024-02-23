const config = require('../config')
const mongoose = require('mongoose').default

const configure = async () => {
    // connect to MongoDB
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.mongo.connectionString, {
        dbName: config.mongo.databaseName,
        autoIndex: false,
    })
}

module.exports = {
    configure: configure,
    mongoose: mongoose
}