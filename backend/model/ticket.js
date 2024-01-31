const {Schema, model} = require('mongoose')

const ticket = model('ticket', new Schema({
        // info
        name: {
            type: String,
            require: true
        },
        // data
        image: {
            type: String
        },
        price: {
            type: Number,
            require: true
        },
        limit: {
            type: Number,
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

const getAllTicketsByEventId = function (eventId, cb) {
    ticket.find({eventId: eventId}, cb)
}

const createTicket = function (data, cb) {
    ticket.create(data, cb)
}

const deleteTicket = function (id, cb) {
    ticket.findByIdAndDelete(id, cb)
}

module.exports = {
    getAllTicketsByEventId: getAllTicketsByEventId,
    createTicket: createTicket,
    deleteTicket: deleteTicket
}