const express = require('express')

module.exports.configure = (app) => {
    app.use(express.json({limit: "50mb", extended: true}))
    app.use(express.urlencoded({limit: "50mb", extended: true}))
}