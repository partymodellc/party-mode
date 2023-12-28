const express = require('express')
const router = express.Router()
const storage = require('../storage')
const logger = require('../logger')

module.exports.getImagesRouter = () => {

    router.get('/:filename', (req, res) => {
        storage.download(
            decodeURIComponent(req.params.filename),
            function (data) {
                return res.status(200).write(data)
            },
            function (err) {
                if (err.code != 'ENOENT') {
                    logger.error('Unexpected error downloading file: ' + err)
                    return res.status(500).send()
                }

                return res.status(404).send()
            },
            function () {
                return res.end()
            }
        )
    })

    return router
}