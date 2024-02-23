const {Schema, model} = require('mongoose')
const config = require('../config')
const ticket = require('./ticket')
const logger = require('../logger')
const storage = require('../storage')

const event = model('event', new Schema({
        // info
        title: {
            type: String
        },
        summary: {
            type: String
        },
        // data
        description: {
            type: String
        },
        image: {
            type: String
        },
        gallery: {
            type: Array
        },
        location: {
            address: {
                type: String
            },
            latitude: Number,
            longitude: Number
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        view: {
            type: String,
            enum: ['Public', 'Private']
        },
        // links
        userId: {
            type: String,
            require: true
        },
        // meta
        type: {
            type: String,
            enum: config.event.types.split(',')
        },
        category: {
            type: String,
            enum: config.event.categories.split(',')
        },
        tags: {
            type: Array
        }
    },
    {
        timestamps: true,
        collection: 'event'
    }
))

const getAllEvents = function (filter, cb) {
    event.find(filter, cb)
}

const getEventById = function (id, cb) {
    event.findById(id, cb)
}

const createEvent = function (data, cb) {
    event.create(data, cb)
}

const updateEvent = function (eventId, userId, data, cb) {
    event.findOneAndUpdate({_id: eventId, userId: userId}, data, {new: true}, cb)
}

const deleteEvent = async function (eventId, userId) {
    const session = await event.startSession()
    session.startTransaction();

    try {
        // delete event
        const deletedEvent = await event.findOneAndDelete({_id: eventId, userId: userId}, {session: session})
        let image, gallery = []
        if (deletedEvent) {
            image = deletedEvent.image
            gallery = deletedEvent.gallery
        }

        // delete event images
        await storage.deleteImage(image)
        for (const img of gallery) {
            await storage.deleteImage(img)
        }

        // delete event tickets
        await ticket.model.deleteMany({eventId: eventId})

        await session.commitTransaction()
        session.endSession()
    } catch (err) {
        logger.error("Error when deleting event: ", {message: err.toString()})
        logger.error(err.stack)
        await session.abortTransaction()
        session.endSession()
        throw err
    }
}

module.exports = {
    getAllEvents: getAllEvents,
    getEventById: getEventById,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
}