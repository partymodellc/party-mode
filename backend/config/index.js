let config = {}

// common
config.nodeEnv = process.env.NODE_ENV || 'development';
config.port = process.env.PORT || 8000;
config.baseUrl = `http://localhost:${config.port}`
config.logLevel = process.env.LOG_LEVEL || 'debug';

// cross-origin resource sharing
config.cors = {}
config.cors.origin = process.env.CORS_ORIGIN || ['http://localhost:5173']

// strategy
config.auth = {}
config.auth.google = {}
config.auth.google.clientId = process.env.AUTH_GOOGLE_CLIENT_ID || '142762244686-3p0inclhqsv2v14nui7rkme7v1vfr935.apps.googleusercontent.com'
config.auth.google.clientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET || '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'
config.auth.facebook = {}
config.auth.facebook.clientId = process.env.AUTH_FACEBOOK_CLIENT_ID || '209452765093371'
config.auth.facebook.clientSecret = process.env.AUTH_FACEBOOK_CLIENT_SECRET || '0f021f8167f32b1ddfd5eaaad7bef2d3'

// session
config.session = {}
config.session.secret = process.env.SESSION_SECRET || 'secret'
config.session.maxAge = process.env.SESSION_MAXAGE || 1000 * 60 * 60 * 24 * 2 // 2 days
config.session.collectionName = process.env.SESSION_COLLECTIONNAME || 'session'

// mongo
config.mongo = {}
config.mongo.connectionString = process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost:27017';
config.mongo.databaseName = process.env.MONGODB_DATABASENAME || 'party-mode';

module.exports = config;