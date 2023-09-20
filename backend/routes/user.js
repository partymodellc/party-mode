const express = require('express')
const router = express.Router()
const User = require('../repository/model/user')
const authHelper = require('./auth-helper')

router.put('/',
    authHelper.requireAuthentication,
    (req, res) => {
        const {username, password, picture} = req.body

        User.updateUser(req.user.id, {username, password, picture}, (err, result) => {
            if (err) {
                return res.status(500).json({message: err.message})
            } else {
                return res.status(204)
            }
        })
    }
)

module.exports = router