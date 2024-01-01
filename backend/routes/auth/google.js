const router = require('express').Router()
const passport = require('passport')
const config = require('../../config')

router.get('/google',
    passport.authenticate('google', {scope: ["email", "profile"]}, null)
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: `${config.cors.origin}/dashboard`,
        failureRedirect: '/auth/google/failure'
    }, null)
)

module.exports = router