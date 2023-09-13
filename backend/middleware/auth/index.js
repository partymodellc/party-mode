const session = require('./session')
const strategy = require('./strategy')
const passport = require("passport")

module.exports.initialize = (app) => {
    app.use(passport.initialize())
}

module.exports.configureSession = (app) => {
    session.configure(app)
}

module.exports.configureAuth = () => {
    strategy.configure()
}