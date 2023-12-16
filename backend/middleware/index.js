const bodyParser = require('./body-parser')
const cors = require('./cors')
const auth = require('./auth')

module.exports.configure = (app) => {
    bodyParser.configure(app)
    cors.configure(app)
    auth.initialize(app)
    auth.configureSession(app)
    auth.configureAuth()
}