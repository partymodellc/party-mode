const express = require('express')
const {checkSchema, matchedData} = require('express-validator')
const router = express.Router()
const event = require('../model/event')
const authVerification = require('../middleware/auth/auth-verification')
const storage = require('../storage')
const validation = require('./validation')
const config = require('../config')
const multer = require("multer")
const logger = require('../logger')

const eventRequestValidations = checkSchema({
    title: validation.stringValidators,
    summary: validation.stringValidators,
    description: validation.stringValidators,
    address: validation.stringValidators,
    latitude: validation.numberValidators,
    longitude: validation.numberValidators,
    startDate: validation.dateValidators,
    endDate: validation.dateValidators,
    view: validation.stringValidators,
    type: {
        ...validation.stringValidators,
        isIn: {
            options: [config.event.types.split(',')],
            errorMessage: "Invalid type. Valid types: " + config.event.types
        }
    },
    category: {
        ...validation.stringValidators,
        isIn: {
            options: [config.event.categories.split(',')],
            errorMessage: "Invalid category. Valid categories: " + config.event.categories
        }
    },
    tags: {
        ...validation.stringArrayValidators,
        optional: {
            options: {values: null}
        }
    },
    'tags.*': validation.stringValidators
}, ['body'])

const validateEventRequest = async (req, res, next) => {
    // validate text fields
    const result = await eventRequestValidations.run(req)
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
    res.locals.galleryFilenames = []
    try {
        for (const file of req.files) {
            if (file.fieldname === 'gallery') {
                res.locals.galleryFilenames.push(storage.upload(file))
            } else if (file.fieldname === 'image') {
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

const generateEventResponse = (event) => {
    return {
        id: event.id,
        title: event.title,
        summary: event.summary,
        description: event.description,
        image: event.image ? encodeURIComponent(event.image) : event.image,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        view: event.view,
        userId: event.userId,
        type: event.type,
        category: event.category,
        tags: event.tags
    }
}

module.exports.getEventsRouter = () => {
    router.get('/', (req, res) => {
        const {userId, ids, title} = req.query

        let filter = {}
        if (userId) {
            filter = {
                ...filter,
                userId: userId
            }
        }
        if (ids) {
            filter = {
                ...filter,
                _id: {$in: ids.split(',')}
            }
        }
        if (title) {
            filter = {
                ...filter,
                title: {$regex: title}
            }
        }

        event.getAllEvents(filter, function (err, events) {
            if (err) {
                return res.status(500).json({message: err.toString()})
            }

            let eventsResponse = []
            events.forEach(event => eventsResponse.push(generateEventResponse(event)))

            return res.status(200).json(eventsResponse)
        })
    })

    router.get('/:eventId', (req, res) => {
        event.getEventById(req.params.eventId, function (err, event) {
            if (err) {
                return res.status(500).json({message: err.toString()})
            }

            if (event) {
                return res.status(200).json(generateEventResponse(event))
            }

            return res.status(404).send()
        })
    })

    router.post('/',
        authVerification.requireAuthentication,
        multer().any(), // parse multipart/form-data
        validateEventRequest,
        storeImages,
        (req, res) => {
            const {
                title,
                summary,
                description,
                address,
                latitude,
                longitude,
                startDate,
                endDate,
                view,
                type,
                category,
                tags
            } = matchedData(req)

            let image = undefined
            if (res.locals.imageFilename) {
                image = res.locals.imageFilename
            }

            let gallery = undefined
            if (res.locals.galleryFilenames) {
                gallery = res.locals.galleryFilenames
            }

            event.createEvent({
                title: title,
                summary: summary,
                description: description,
                image: image,
                gallery: gallery,
                location: {
                    address: address,
                    latitude: latitude,
                    longitude: longitude
                },
                startDate: startDate,
                endDate: endDate,
                view: view,
                userId: req.user.id,
                type: type,
                category: category,
                tags: tags
            }, function (err, event) {
                if (err) {
                    return res.status(500).json({message: err.toString()})
                }

                if (event) {
                    return res.status(201).json(generateEventResponse(event))
                }

                return res.status(500).json({message: 'unexpected error creating event'})
            })
        }
    )

    router.put('/:eventId',
        authVerification.requireAuthentication,
        multer().any(), // parse multipart/form-data
        validateEventRequest,
        storeImages,
        (req, res) => {
            const {
                title,
                summary,
                description,
                address,
                latitude,
                longitude,
                startDate,
                endDate,
                view,
                type,
                category,
                tags
            } = matchedData(req)

            let image = undefined
            if (res.locals.imageFilename) {
                image = res.locals.imageFilename
            }

            let gallery = undefined
            if (res.locals.galleryFilenames) {
                gallery = res.locals.galleryFilenames
            }

            event.updateEvent(req.params.eventId, req.user.id, {
                    title: title,
                    summary: summary,
                    description: description,
                    image: image,
                    gallery: gallery,
                    location: {
                        address: address,
                        latitude: latitude,
                        longitude: longitude
                    },
                    startDate: startDate,
                    endDate: endDate,
                    view: view,
                    type: type,
                    category: category,
                    tags: tags
                },
                (err, event) => {
                    if (err) {
                        return res.status(500).json({message: err.toString()})
                    }

                    if (event) {
                        return res.status(200).json(generateEventResponse(event))
                    }

                    return res.status(404).send()
                }
            )
        }
    )

    router.delete('/:eventId',
        authVerification.requireAuthentication,
        (req, res) => {
            event.deleteEvent(req.params.eventId, req.user.id)
                .then(() => {
                    return res.status(204).send()
                })
                .catch(err => {
                    return res.status(500).json({error: err.toString()})
                })
        }
    )

    return router
}