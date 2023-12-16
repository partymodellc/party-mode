const config = require('../../config')
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('passport')
const User = require("../../model/user")

module.exports.configure = (app) => {
    const mongodbStore = new MongoDBStore({
        uri: config.mongo.connectionString,
        databaseName: config.mongo.databaseName,
        collection: config.session.collectionName,
        expires: config.session.maxAge
    }, function (err){
        if(err){

        }
    })

    // set session store
    app.use(session({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: config.session.maxAge},
        store: mongodbStore
    }))

    // set session implementation
    app.use(passport.session({}))

    // setup session user serialization
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    // setup session user deserialization
    passport.deserializeUser(function (id, done) {
        User.getUserById(id, function (err, user) {
            done(err, user)
        })
    })
}