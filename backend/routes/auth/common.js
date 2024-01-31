const router = require('express').Router()

router.get('/login/success',
    (req, res) => {
        res.status(200).send()
    }
)

router.get('/logout',
    (req, res) => {
        req.logout()
        req.session.destroy()
        return res.status(200).send()
    }
)

router.get('/failure',
    (req, res) => {
        return res.status(400).json({error: 'Failed to authenticate'})
    }
)

module.exports = router