const {Schema, model} = require('mongoose')

const ticket = model('ticket', new Schema({
        // info
        name: {
            type: String,
            require: true
        },
        // data
        price: {
            type: Number,
            require: true
        },
        limit: {
            type: Number,
        },
        startDate: {
            type: Date,
            require: true,
        },
        endDate: {
            type: Date,
            require: true
        },
        // meta
        sales: {
            type: Number,
            default: 0
        },
        // links
        eventId: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        collection: 'ticket'
    }
))

const getTicketsByEventId = function (eventId, cb) {
    ticket.find({eventId: eventId}, cb)
}

const createTicket = function (data, cb) {
    ticket.create(data, cb)
}

const deleteTicket = function (id, cb) {
    ticket.findByIdAndDelete(id, cb)
}

module.exports = {
    getTicketsByEventId: getTicketsByEventId,
    createTicket: createTicket,
    deleteTicket: deleteTicket
}