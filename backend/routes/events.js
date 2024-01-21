const express = require('express')
const {checkSchema, validationResult, matchedData} = require('express-validator')
const router = express.Router()
const event = require('../model/event')
const authHelper = require('./auth-helper')
const storage = require('../storage')

// TODO: abstract out into file for reuse in other routes
const stringValidators = {
    exists: {
        bail: true,
        errorMessage: "missing required value"
    },
    isString: {
        bail: true,
        errorMessage: "value must be a string"
    },
    notEmpty: {
        bail: true,
        errorMessage: "value cannot be empty"
    },
    trim: true
}

const dateValidators = {
    exists: {
        bail: true,
        errorMessage: "missing required value"
    },
    isISO8601: {
        bail: true,
        errorMessage: "value must be a date"
    },
    toDate: true
}

const stringArrayValidators = {
    isArray: {
        bail: true,
        errorMessage: "value must be a string array"
    }
}

module.exports.getEventsRouter = () => {
    router.get('/', (req, res) => {
        let filter = {}
        // TODO: support query params
        event.getAllEvents(filter, function (err, events) {
            if (err) {
                return res.status(500).json({message: err.message})
            }

            let eventsResponse = []
            events.forEach(evt => eventsResponse.push({
                id: evt.id,
                title: evt.title,
                summary: evt.summary,
                description: evt.description,
                image: encodeURIComponent(evt.image),
                location: evt.location,
                startDate: evt.startDate,
                endDate: evt.endDate,
                view: evt.view,
                userId: evt.userId,
                type: evt.type,
                tickets: evt.tickets,
                category: evt.category,
                tags: evt.tags
            }))

            return res.status(200).json(eventsResponse)
        })
    })

    router.get('/:eventId', (req, res) => {
        event.getEventById(req.params.eventId, function (err, event) {
            if (err) {
                return res.status(500).json({message: err.message})
            }

            if (event) {
                return res.status(200).json({
                    id: event.id,
                    title: event.title,
                    summary: event.summary,
                    description: event.description,
                    image: encodeURIComponent(event.image),
                    location: event.location,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    view: event.view,
                    userId: event.userId,
                    type: event.type,
                    tickets: event.tickets,
                    category: event.category,
                    tags: event.tags
                })
            }

            return res.status(404)
        })
    })

    router.post('/',
        authHelper.requireAuthentication,
        // TODO: additional authHelper middleware for authorization based on membership type
        storage.upload().single('image'), // also used to parse multipart/form-data
        // TODO: validate values for enums
        checkSchema({
            title: stringValidators,
            summary: stringValidators,
            description: stringValidators,
            location: stringValidators,
            startDate: dateValidators,
            endDate: dateValidators,
            type: stringValidators,
            category: stringValidators,
            tags: stringArrayValidators,
            'tags.*': stringValidators
        }, ['body']),
        (req, res, next) => {
            // custom validation for image field
            if (req.file == null) {
                return res.status(400).json({error: 'image file is required'})
            }

            // gather result from validations
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({errors: result.array()});
            }

            next()
        },
        (req, res) => {
            const {
                title,
                summary,
                description,
                location,
                startDate,
                endDate,
                type,
                category,
                tags
            } = matchedData(req);

            event.createEvent({
                title: title,
                summary: summary,
                description: description,
                image: req.file.filename,
                location: {name: location},
                startDate: startDate,
                endDate: endDate,
                userId: req.user.id,
                type: type,
                category: category,
                tags: tags
            }, function (err, event) {
                if (err) {
                    return res.status(500).json({message: err.message})
                }

                if (event) {
                    return res.status(201).json({
                        id: event.id,
                        title: event.title,
                        summary: event.summary,
                        description: event.description,
                        image: event.image,
                        location: event.location,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        view: event.view,
                        userId: event.userId,
                        type: event.type,
                        tickets: event.tickets,
                        category: event.category,
                        tags: event.tags
                    })
                }

                return res.status(500).json({message: 'unexpected error creating event'})
            })
        }
    )

    // updating events not supported yet
    // router.put('/:eventId',
    //     authHelper.requireAuthentication,
    //     (req, res) => {
    //         // TODO: authorize before updating event
    //         const {
    //             title,
    //             summary,
    //             description,
    //             image,
    //             images,
    //             location,
    //             startDate,
    //             endDate,
    //             view,
    //             userId,
    //             type,
    //             tickets,
    //             category,
    //             tags
    //         } = req.body
    //
    //         event.updateEvent(req.params.eventId, {
    //                 title: title,
    //                 summary: summary,
    //                 description: description,
    //                 image: image,
    //                 images: images,
    //                 location: location,
    //                 startDate: startDate,
    //                 endDate: endDate,
    //                 view: view,
    //                 userId: userId,
    //                 type: type,
    //                 tickets: tickets,
    //                 category: category,
    //                 tags: tags
    //             },
    //             (err, event) => {
    //                 if (err) {
    //                     return res.status(500).json({message: err.message})
    //                 }
    //
    //                 return res.status(200).json(event)
    //             }
    //         )
    //     }
    // )

    // deleting events not supported yet
    // router.delete('/:eventId',
    //     authHelper.requireAuthentication,
    //     (req, res) => {
    //         // TODO: authorize before deleting event
    //         event.deleteEvent(req.params.eventId, function (err, event) {
    //             if (err) {
    //                 return res.status(500).json({message: err.message})
    //             }
    //
    //             if (event) {
    //                 res.status(204)
    //             }
    //
    //             res.status(500).json({message: 'Unexpected error deleting event'})
    //         })
    //
    //     }
    // )

    return router
}