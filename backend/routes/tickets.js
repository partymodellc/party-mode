const express = require('express')
const router = express.Router()
const ticket = require('../model/ticket')
const authVerification = require("../middleware/auth/auth-verification")
const event = require('../model/event')
const {checkSchema} = require("express-validator")
const validation = require("./validation")
const storage = require("../storage");
const logger = require("../logger");
const multer = require("multer")

const ticketRequestValidations = checkSchema({
    name: validation.stringValidators,
    price: {
        ...validation.numberValidators,
        optional: {
            options: {values: null}
        }
    },
    limit: {
        ...validation.numberValidators,
        optional: {
            options: {values: null}
        }
    },
    eventId: validation.stringValidators
}, ['body'])

const validateTicketRequest = async (req, res, next) => {
    // validate text fields
    const result = await ticketRequestValidations.run(req)
    let errors = []
    result.forEach(result => {
        if (result.array().length > 0) {
            errors = errors.concat(result.array())
        }
    })

    // validate file fields
    if (req.files?.length === (0 || undefined)) {
        errors = errors.concat({
            type: "field",
            msg: "image is required",
            path: "image",
            location: "body"
        })
    } else {
        let imageFieldExists = false
        req.files.forEach(file => {
            if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
                errors = errors.concat({
                    type: "field",
                    value: file.originalname,
                    msg: "file type can only be JPEG,JPG, or PNG",
                    path: file.fieldname,
                    location: "body"
                })
            }

            if (file.fieldname === 'image') {
                imageFieldExists = true
            }
        })

        if (!imageFieldExists) {
            errors = errors.concat({
                type: "field",
                msg: "field 'image' is required",
                path: "image",
                location: "body"
            })
        }
    }

    if (errors.length > 0) {
        return res.status(400).json(errors)
    }

    next()
}

const storeImages = async (req, res, next) => {
    try {
        for (const file of req.files) {
            if (file.fieldname === 'image') {
                res.locals.imageFilename = storage.upload(file)
            }
        }
    } catch (err) {
        logger.error("Error storing image(s): ", {message: err.toString()})
        logger.error(err.stack)
        return res.status(500).json({error: err.toString()})
    }

    next()
}

const generateTicketResponse = (ticket) => {
    return {
        id: ticket.id,
        name: ticket.name,
        image: ticket.image,
        price: ticket.price,
        limit: ticket.limit,
        eventId: ticket.eventId,
    }
}

module.exports.getTicketsRouter = () => {
    router.get('/event/:eventId', (req, res) => {
        ticket.getAllTicketsByEventId(req.params.eventId, function (err, tickets) {
            if (err) {
                return res.status(500).json({message: err.message})
            }

            if (tickets) {
                let ticketsResponse = []
                tickets.forEach(ticket => ticketsResponse.push(generateTicketResponse(ticket)))

                return res.status(200).send(ticketsResponse)
            }

            return res.status(404).send()
        })
    })

    router.post('/',
        authVerification.requireAuthentication,
        multer().any(), // parse multipart/form-data
        validateTicketRequest,
        // verify user authorization
        (req, res, next) => {
            const {eventId} = req.body

            event.getEventById(eventId, function (err, event) {
                if (err) {
                    return res.status(500).json({message: err.toString()})
                }

                if (event) {
                    if (event.userId === req.user.id) {
                        next()
                    } else {
                        return res.status(401).send()
                    }
                } else {
                    return res.status(404).send()
                }
            })
        },
        storeImages,
        (req, res) => {
            const {
                name,
                price,
                limit,
                eventId
            } = req.body

            let image = undefined
            if (res.locals.imageFilename) {
                image = res.locals.imageFilename
            }

            ticket.createTicket({
                name: name,
                image: image,
                price: price,
                limit: limit,
                eventId: eventId,
                userId: req.user.id
            }, function (err, ticket) {
                if (err) {
                    return res.status(500).json({message: err.message})
                }

                if (ticket) {
                    return res.status(201).json(generateTicketResponse(ticket))
                }

                return res.status(500).json({message: 'Unexpected error creating ticket'})
            })
        })

    router.delete('/:ticketId',
        authVerification.requireAuthentication,
        (req, res) => {
            ticket.deleteTicket(req.params.ticketId, req.user.id, function (err, ticket) {
                if (err) {
                    return res.status(500).json({message: err.message})
                }

                if (ticket) {
                    return res.status(200).send(generateTicketResponse(ticket))
                }

                return res.status(404).send()
            })
        })

    return router
}