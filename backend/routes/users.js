const express = require('express')
const router = express.Router()
const Users = require('../model/user')
const authVerification = require('../middleware/auth/auth-verification')


// TODO: add validations
module.exports.getUsersRouter = () => {

    router.get('/me',
        authVerification.requireAuthentication,
        (req, res) => {
            return res.status(200).json({
                id: req.user.id,
                username: req.user.username,
                email: req.user.email,
                membership: req.user.membership,
                image: req.image,
                paymentIds: req.user.paymentIds,
                likes: req.user.likes
            })
        }
    )

    // TODO: support updating picture
    router.put('/me',
        authVerification.requireAuthentication,
        (req, res) => {
            const {username, password, like} = req.body

            Users.updateUser(req.user.id, username, password, like, (err, result) => {
                if (err) {
                    return res.status(500).json({message: err.message})
                } else {
                    return res.status(204).send()
                }
            })
        }
    )

    router.post('/me/likes/:eventId',
        authVerification.requireAuthentication,
        (req, res) => {
            Users.addUserLike(req.user.id, req.params.eventId, (err) => {
                if (err) {
                    return res.status(500).json({message: err.message})
                } else {
                    return res.status(201).send()
                }
            })
        }
    )

    router.delete('/me/likes/:eventId',
        authVerification.requireAuthentication,
        (req, res) => {
            Users.removeUserLike(req.user.id, req.params.eventId, (err) => {
                if (err) {
                    return res.status(500).json({message: err.message})
                } else {
                    return res.status(201).send()
                }
            })
        }
    )

    return router
}