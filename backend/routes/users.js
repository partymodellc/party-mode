const express = require('express')
const router = express.Router()
const Users = require('../model/user')
const authVerification = require('../middleware/auth/auth-verification')

module.exports.getUsersRouter = () => {

    router.get('/me',
        authVerification.requireAuthentication,
        (req, res) => {
            return res.status(200).json({
                username: req.user.username,
                email: req.user.email,
                membership: req.user.membership,
                eventIds: req.user.eventIds,
                paymentIds: req.user.paymentIds
            })
        }
    )

    router.put('/me',
        authVerification.requireAuthentication,
        (req, res) => {
            const {username, password, picture} = req.body

            Users.updateUser(req.user.id, {username, password, picture}, (err, result) => {
                if (err) {
                    return res.status(500).json({message: err.message})
                } else {
                    return res.status(204).send()
                }
            })
        }
    )

    return router
}