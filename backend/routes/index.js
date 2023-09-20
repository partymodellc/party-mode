const authRoute = require('./auth')
const userRoute = require('./user')
const eventRoute = require('./event')
const ticketRoute = require('./ticket')
const commentRoute = require('./comment')
const healthRoute = require('./health')

module.exports.configure = (app) => {
    authRoute.configure(app)
    app.use('/user', userRoute)
    app.use('/event', eventRoute)
    app.use('/ticket', ticketRoute)
    app.use('/comment', commentRoute)
    app.use('/health', healthRoute)
}