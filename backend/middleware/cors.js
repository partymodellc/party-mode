const config = require('../config')
const cors = require('cors')

module.exports.configure = (app) => {
    app.use(
        cors({
            origin: config.cors.origin,
            methods: 'GET,POST,PUT,DELETE',
            credentials: true,
        })
    )
}