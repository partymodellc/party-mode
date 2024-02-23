const {Schema, model} = require('mongoose')

const ticket = model('ticket', new Schema({
        // info
        name: {
            type: String
        },
        // data
        image: {
            type: String
        },
        price: {
            type: Number,
            default: 0
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
        userId: {
            type: String
        },
        eventId: {
            type: String
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

const deleteTicket = function (id, userId, cb) {
    ticket.findOneAndDelete({_id: id, userId: userId}, null, cb)
}

module.exports = {
    model: ticket,
    getAllTicketsByEventId: getAllTicketsByEventId,
    createTicket: createTicket,
    deleteTicket: deleteTicket
}