require('dotenv').config()

let config = {

    // common
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    callbackBaseUrl: process.env.CALLBACK_BASE_URL || 'http://localhost:8080',
    logLevel: process.env.LOG_LEVEL || 'debug',

    // cross-origin resource sharing
    cors: {
        origin: process.env.CORS_ORIGIN || ['http://localhost:8082']
    },

    // authentication
    auth: {
        google: {
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID || 'change-me',
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET || 'change-me'
        },
        facebook: {
            clientId: process.env.AUTH_FACEBOOK_CLIENT_ID || 'change-me',
            clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET || 'change-me'
        }
    },

    // session
    session: {
        secret: process.env.SESSION_SECRET || 'secret',
        maxAge: parseInt(process.env.SESSION_MAX_AGE || 1000 * 60 * 60 * 24 * 2), // 2 days
        collectionName: process.env.SESSION_COLLECTIONNAME || 'session'
    },

    // mongo
    mongo: {
        connectionString: process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost:27017',
        databaseName: process.env.MONGODB_DATABASENAME || 'party-mode'
    }
}

module.exports = config