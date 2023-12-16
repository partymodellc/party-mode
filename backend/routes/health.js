const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    const readyState = mongoose.connection.readyState

    if (readyState === 1) {
        return res.status(200).json({mongodb: {readyState: readyState}})
    }

    return res.status(500).json({mongodb: {readyState: readyState}})
})

module.exports = router