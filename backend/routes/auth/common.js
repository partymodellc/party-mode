const router = require('express').Router()
const authZ = require('../auth-helper')

router.get('/login/success',
    authZ.requireAuthentication,
    (req, res) => {
        res.status(200).json({
            username: req.user.username,
            email: req.user.email,
            membership: req.user.membership,
            eventIds: req.user.eventIds,
            paymentIds: req.user.paymentIds
        })
    }
)

router.get('/logout',
    (req, res) => {
        req.logout()
        req.session.destroy()
        return res.status(200)
    }
)

router.get('/failure',
    (req, res) => {
        return res.status(400).json({error: 'Failed to authenticate'})
    }
)

module.exports = router