const {Schema, model} = require('mongoose')

const ticket = model('ticket', new Schema({
        name: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true
        },
        price: {
            type: Number,
        },
        sales: {
            type: Number,
        },
        image: {
            type: String,
            require: true,
        },
        eventId: {
            type: String,
            require: true
        },
        section: {
            type: String,
            require: true,
        },
        promoCodes: {
            type: Array
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