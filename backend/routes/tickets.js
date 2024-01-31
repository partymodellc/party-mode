const express = require('express')
const router = express.Router()
const Tickets = require('../model/ticket')

module.exports.getTicketsRouter = () => {

    router.get('/event/:eventId', (req, res) => {
        Tickets.getAllTicketsByEventId(req.params.eventId, function (err, tickets) {
            if (err) {
                return res.status(500).json({message: err.message})
            }

            if (tickets) {
                let ticketsResponse = []
                tickets.forEach(ticket => ticketsResponse.push({
                    id: ticket.id,
                    name: ticket.name,
                    image: ticket.image,
                    price: ticket.price,
                    limit: ticket.limit,
                    eventId: ticket.eventId,
                }))

                return res.status(200).send(ticketsResponse)
            }

            return res.status(404).send()
        })
    })

    router.post('/', (req, res) => {
        const {
            name,
            price,
            limit,
            eventId
        } = req.body

        Tickets.createTicket({
            name: name,
            price: price,
            limit: limit,
            eventId: eventId,
        }, function (err, ticket) {
            if (err) {
                return res.status(500).json({message: err.message})
            }

            if (ticket) {
                return res.status(201).json({
                    id: ticket.id,
                    name: ticket.name,
                    image: ticket.image,
                    price: ticket.price,
                    limit: ticket.limit,
                    eventId: ticket.eventId,
                })
            }

            return res.status(500).json({message: 'Unexpected error creating ticket'})
        })
    })

    router.delete('/:ticketId', (req, res) => {
        Tickets.deleteTicket(req.params.ticketId, function (err, ticket) {
            if (err) {
                return res.status(500).json({message: err.message})
            }

            if (ticket) {
                return res.status(200).send({
                    id: ticket.id,
                    name: ticket.name,
                    image: ticket.image,
                    price: ticket.price,
                    limit: ticket.limit,
                    eventId: ticket.eventId,
                })
            }

            return res.status(500).json({message: 'Unexpected error deleting ticket'})
        })
    })

    // router.delete('/:eventId', (req, res) => {
    //     Tickets.deleteTicket(req.params.eventId, function (err, ticket) {
    //         if (err) {
    //             return res.status(500).json({message: err.message})
    //         }
    //
    //         if (ticket) {
    //             return res.status(200).send()
    //         }
    //
    //         return res.status(500).json({message: 'Unexpected error deleting ticket'})
    //     })
    // })

    return router
}