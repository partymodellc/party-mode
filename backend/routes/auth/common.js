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
        return res.status(200)
    }
)

router.get('/failure',
    (req, res) => {
        return res.status(400).json({ error: 'Failed to authenticate' })
    }
)

module.exports = router