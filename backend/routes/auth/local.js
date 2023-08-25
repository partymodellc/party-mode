const router = require('express').Router()
const passport = require('passport')
const User = require("../../model/user")
const bcrypt = require("bcrypt")

router.post('/register',
    (req, res) => {
        try {
            let {username, email, password} = req.body

            User.getUserByEmail(email, function (err, user) {
                if (err) {
                    return res.status(500).json({message: err.message})
                }

                if (user) {
                    return res.status(400).json({message: "User already exists"})
                }

                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return res.status(500).json({message: err.message})
                    }

                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            return res.status(500).json({message: err.message})
                        }

                        password = hash

                        User.createUser({username, email, password}, function (err, user) {
                            if (err) {
                                return res.status(500).json({message: err.message})
                            }
                            return res.status(200).json({username: user.username, email: user.email})
                        })
                    })
                })
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
)

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/auth/login/success',
        failureRedirect: '/auth/failure'
    })
)

module.exports = router