const authRoute = require('./auth')
const users = require('./users')
const events = require('./events')
const tickets = require('./tickets')
const comments = require('./comments')
const images = require('./images')
const health = require('./health')

module.exports.configure = (app) => {
    authRoute.configure(app)
    app.use('/users', users.getUsersRouter())
    app.use('/events', events.getEventsRouter())
    app.use('/tickets', tickets.getTicketsRouter())
    app.use('/comments', comments.getCommentsRouter())
    app.use('/images', images.getImagesRouter())
    app.use('/health', health.getHealthRouter())
}