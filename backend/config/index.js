let config = {}

// common
config.nodeEnv = process.env.NODE_ENV || 'development'
config.port = process.env.PORT || 8081
config.baseUrl = `http://127.0.0.1:${config.port}`
config.logLevel = process.env.LOG_LEVEL || 'debug'

// cross-origin resource sharing
config.cors = {}
config.cors.origin = process.env.CORS_ORIGIN || ['http://127.0.0.1:8080']

// strategy
config.auth = {}
config.auth.google = {}
config.auth.google.clientId = process.env.AUTH_GOOGLE_CLIENT_ID || 'sdf'
config.auth.google.clientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET || 'sdfs'
config.auth.facebook = {}
config.auth.facebook.clientId = process.env.AUTH_FACEBOOK_CLIENT_ID || 'sdfs'
config.auth.facebook.clientSecret = process.env.AUTH_FACEBOOK_CLIENT_SECRET || 'sfsdnpm'

// session
config.session = {}
config.session.secret = process.env.SESSION_SECRET || 'secret'
config.session.maxAge = process.env.SESSION_MAX_AGE || 1000 * 60 * 60 * 24 * 2 // 2 days
config.session.collectionName = process.env.SESSION_COLLECTIONNAME || 'session'

// mongo
config.mongo = {}
config.mongo.connectionString = process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost:27017'
config.mongo.databaseName = process.env.MONGODB_DATABASENAME || 'party-mode'

module.exports = config