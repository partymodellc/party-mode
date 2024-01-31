const {Schema, model} = require('mongoose')

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
            enum: ['Public', 'Private'],
            default: 'Public'
        },
        status: {
            type: String,
            enum: ['Draft', 'Published', 'Scheduled'],
            default: 'Draft'
        },
        // links
        userId: {
            type: String,
            require: true
        },
        // meta
        type: {
            type: String,
            // TODO: outline types
            enum: ['type1', 'type2']
        },
        category: {
            type: String,
            // TODO: outline categories
            enum: ['cat1', 'cat2']
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

const deleteEvent = function (eventId, userId, cb) {
    event.findOneAndDelete({_id: eventId, userId: userId}, {new: false}, cb)
}

module.exports = {
    getAllEvents: getAllEvents,
    getEventById: getEventById,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
}