const commonRoute = require('./common')
const localRoute = require('./local')
const googleRoute = require('./google')
const facebookRoute = require('./facebook')

module.exports.configure = (app) => {
    app.use('/auth',
        commonRoute,
        localRoute,
        googleRoute,
        facebookRoute)
}