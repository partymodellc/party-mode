const express = require('express')
const router = express.Router()
const User = require('../model/user')
const authHelper = require('./auth-helper')

router.put('/',
    authHelper.requireAuthentication,
    (req, res) => {
        const {username, password, picture} = req.body

        User.updateUser(req.user.id, {username, password, picture}, (err, result) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                res.status(204)
            }
        })
    }
)

module.exports = router