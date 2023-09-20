const router = require('express').Router()
const authZ = require('../auth-helper')

router.get('/login/success',
    authZ.requireAuthentication,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
        })
    }
)

router.get('/logout',
    (req, res) => {
        req.logout()
        req.session.destroy()
        res.send("User has been logged out")
    }
)

router.get('/failure',
    (req, res) => {
        res.send('Failed to authenticate')
    }
)

module.exports = router