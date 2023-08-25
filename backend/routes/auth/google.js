const router = require('express').Router()
const passport = require('passport')

router.get('/google',
    passport.authenticate('google', {scope: ["email", "profile"]})
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:5173/dashboard',
        failureRedirect: '/auth/google/failure'
    })
)

module.exports = router