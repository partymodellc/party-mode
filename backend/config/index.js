require('dotenv').config()

let config = {}

// common
config.nodeEnv = process.env.NODE_ENV || 'development'
config.port = process.env.PORT || 8080
config.baseUrl = `http://localhost:${config.port}`
config.logLevel = process.env.LOG_LEVEL || 'debug'

// cross-origin resource sharing
config.cors = {}
config.cors.origin = process.env.CORS_ORIGIN || ['http://localhost:8082']

// strategy
config.auth = {}
config.auth.google = {}
config.auth.google.clientId = process.env.AUTH_GOOGLE_CLIENT_ID || 'change-me'
config.auth.google.clientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET || 'change-me'
config.auth.facebook = {}
config.auth.facebook.clientId = process.env.AUTH_FACEBOOK_CLIENT_ID || 'change-me'
config.auth.facebook.clientSecret = process.env.AUTH_FACEBOOK_CLIENT_SECRET || 'change-me'

// session
config.session = {}
config.session.secret = process.env.SESSION_SECRET || 'secret'
config.session.maxAge = parseInt(process.env.SESSION_MAX_AGE || 1000 * 60 * 60 * 24 * 2) // 2 days
config.session.collectionName = process.env.SESSION_COLLECTIONNAME || 'session'

// mongo
config.mongo = {}
config.mongo.connectionString = process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost:27017'
config.mongo.databaseName = process.env.MONGODB_DATABASENAME || 'party-mode'

module.exports = config