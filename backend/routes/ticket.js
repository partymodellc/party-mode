const express = require('express')
const router = express.Router()
const Ticket = require('../model/ticket')

router.get('/:eventId', (req, res) => {
    Ticket.getTicketsByEventId(req.params.eventId, function (err, tickets) {
        if (err) {
            return res.status(500).json({message: err.message})
        }

        if (tickets) {
            return res.status(200).send(tickets)
        }

        return res.status(404)
    })
})

router.post('/', (req, res) => {
    const {
        name,
        type,
        price,
        image,
        event,
        section,
        promoCodes
    } = req.body

    Ticket.createTicket({
        name: name,
        type: type,
        price: price,
        sales: 0,
        image: image,
        event: event,
        section: section,
        promoCodes: promoCodes
    }, function (err, ticket) {
        if (err) {
            return res.status(500).json({message: err.message})
        }

        if (ticket) {
            return res.status(201).json(ticket)
        }

        return res.status(500).json({message: 'Unexpected error creating ticket'})
    })
})

router.delete('/:eventId', (req, res) => {
    Ticket.deleteTicket(req.params.eventId, function (err, ticket) {
        if (err) {
            return res.status(500).json({message: err.message})
        }

        if (ticket) {
            return res.status(200)
        }

        return res.status(500).json({message: 'Unexpected error deleting ticket'})
    })
})

module.exports = router