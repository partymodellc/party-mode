const router = require('express').Router()
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:5173/dashboard',
        failureRedirect: '/auth/failure'
    })
)

module.exports = router