const config = require('../../../config')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.clientId,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: `${config.callbackBaseUrl}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log("fb Profile: ", profile)
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        // return cb(err, user)
        // });
        return cb(new Error('unimplemented'), null)
    }
))