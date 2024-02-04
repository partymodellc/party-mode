const express = require('express')
const {checkSchema, validationResult, matchedData} = require('express-validator')
const router = express.Router()
const event = require('../model/event')
const authVerification = require('../middleware/auth/auth-verification')
const storage = require('../storage')

// TODO: abstract out into file for reuse in other routes
const stringValidators = {
    optional: {
        options: {values: null}
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

const numberValidators = {
    optional: {
        options: {values: null}
    },
    isNumeric: {
        bail: true,
        errorMessage: "value must be a number"
    }
}

const dateValidators = {
    optional: {
        options: {values: null}
    },
    isISO8601: {
        bail: true,
        errorMessage: "value must be a date"
    },
    toDate: true
}

const stringArrayValidators = {
    optional: {
        options: {values: null}
    },
    isArray: {
        bail: true,
        errorMessage: "value must be a string array"
    }
}

module.exports.getEventsRouter = () => {
    router.get('/', (req, res) => {
        let filter = {}

        const {userId} = req.query
        if (userId) {
            filter = {
                ...filter,
                userId: userId
            }
        }

        const {ids} = req.query
        if (ids) {
            filter = {
                ...filter,
                _id: {$in: ids.split(',')}
            }
        }

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
                image: evt.image ? encodeURIComponent(evt.image) : evt.image,
                location: evt.location,
                startDate: evt.startDate,
                endDate: evt.endDate,
                view: evt.view,
                status: evt.status,
                userId: evt.userId,
                type: evt.type,
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
                    image: event.image ? encodeURIComponent(event.image) : event.image,
                    location: event.location,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    view: event.view,
                    status: event.status,
                    userId: event.userId,
                    type: event.type,
                    category: event.category,
                    tags: event.tags
                })
            }

            return res.status(404).send()
        })
    })

    // TODO: add support for gallery
    router.post('/',
        authVerification.requireAuthentication,
        // TODO: additional authHelper middleware for authorization based on membership type
        storage.upload().single('image'), // also used to parse multipart/form-data
        // TODO: validate values for enums
        checkSchema({
            title: stringValidators,
            summary: stringValidators,
            description: stringValidators,
            'location[address]': stringValidators,
            'location[latitude]': numberValidators,
            'location[longitude]': numberValidators,
            startDate: dateValidators,
            endDate: dateValidators,
            view: stringValidators,
            status: stringValidators,
            type: stringValidators,
            category: stringValidators,
            tags: stringArrayValidators,
            'tags.*': stringValidators
        }, ['body']),
        (req, res, next) => {
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
                view,
                status,
                type,
                category,
                tags
            } = matchedData(req)

            let filename = undefined
            if (req.file) {
                filename = req.file.filename
            }

            event.createEvent({
                title: title,
                summary: summary,
                description: description,
                image: filename,
                location: location,
                startDate: startDate,
                endDate: endDate,
                view: view,
                status: status,
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
                        image: event.image ? encodeURIComponent(event.image) : event.image,
                        location: event.location,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        view: event.view,
                        status: event.status,
                        userId: event.userId,
                        type: event.type,
                        category: event.category,
                        tags: event.tags
                    })
                }

                return res.status(500).json({message: 'unexpected error creating event'})
            })
        }
    )

    router.put('/:eventId',
        authVerification.requireAuthentication,
        // TODO: additional authHelper middleware for authorization based on membership type
        storage.upload().single('image'), // also used to parse multipart/form-data
        // TODO: validate values for enums
        checkSchema({
            title: stringValidators,
            summary: stringValidators,
            description: stringValidators,
            'location[address]': stringValidators,
            'location[latitude]': numberValidators,
            'location[longitude]': numberValidators,
            startDate: dateValidators,
            endDate: dateValidators,
            view: stringValidators,
            status: stringValidators,
            type: stringValidators,
            category: stringValidators,
            tags: stringArrayValidators,
            'tags.*': stringValidators
        }, ['body']),
        (req, res, next) => {
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
                view,
                status,
                type,
                category,
                tags
            } = req.body

            let filename = undefined
            if (req.file) {
                filename = req.file.filename
            }

            event.updateEvent(req.params.eventId, req.user.id, {
                    title: title,
                    summary: summary,
                    description: description,
                    image: filename,
                    location: location,
                    startDate: startDate,
                    endDate: endDate,
                    view: view,
                    status: status,
                    type: type,
                    category: category,
                    tags: tags
                },
                (err, event) => {
                    if (err) {
                        return res.status(500).json({message: err.message})
                    }

                    if (event) {
                        return res.status(200).json({
                            id: event.id,
                            title: event.title,
                            summary: event.summary,
                            description: event.description,
                            image: event.image ? encodeURIComponent(event.image) : event.image,
                            location: event.location,
                            startDate: event.startDate,
                            endDate: event.endDate,
                            view: event.view,
                            status: event.status,
                            userId: event.userId,
                            type: event.type,
                            category: event.category,
                            tags: event.tags
                        })
                    }

                    return res.status(404).send()
                }
            )
        }
    )

    router.delete('/:eventId',
        authVerification.requireAuthentication,
        (req, res) => {
            // TODO: delete image and tickets first
            event.deleteEvent(req.params.eventId, req.user.id, (err, event) => {
                    if (err) {
                        return res.status(500).json({message: err.message})
                    }

                    if (event) {
                        return res.status(204).json({
                            id: event.id,
                            title: event.title,
                            summary: event.summary,
                            description: event.description,
                            image: event.image ? encodeURIComponent(event.image) : event.image,
                            location: event.location,
                            startDate: event.startDate,
                            endDate: event.endDate,
                            view: event.view,
                            status: event.status,
                            userId: event.userId,
                            type: event.type,
                            category: event.category,
                            tags: event.tags
                        })
                    }

                    return res.status(404).send()
                }
            )

        }
    )

    return router
}