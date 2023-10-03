const config = require('../../../config')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../../model/user')

passport.use('google', new GoogleStrategy({
        clientID: config.auth.google.clientId,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: `${config.callbackBaseUrl}/auth/google/callback`,
        passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
        const {emails, displayName, provider} = profile || {}

        if (!emails) {
            done(new Error('Cannot authenticate via Google without an email'), null)
        }

        if (emails.length === 0) {
            done(new Error('Cannot authenticate via Google without an email'), null)
        }

        User.getOrCreateUserByEmail(
            emails[0].value,
            {
                email: emails[0].value,
                username: displayName,
                provider: provider
            }, function (err, user) {
                return done(err, user)
            })
    }))

