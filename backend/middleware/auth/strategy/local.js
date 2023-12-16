const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../../model/user')
const bcrypt = require('bcrypt')

passport.use('local', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        User.getUserByEmail(email, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {message: 'User not found'})
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) {
                    return done(err, null)
                }

                if (isMatch) {
                    return done(null, user)
                }

                return done(null, false, {message: 'Incorrect password'})
            })
        })
    }
))