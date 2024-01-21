const {Schema, model} = require('mongoose')

const event = model('event', new Schema({
        // info
        title: {
            type: String,
            require: true
        },
        summary: {
            type: String,
            require: true
        },
        // data
        description: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        location: {
            name: {
                type: String,
                require: true
            },
            latitude: Number,
            longitude: Number
        },
        startDate: {
            type: Date,
            require: true
        },
        endDate: {
            type: Date,
            require: true
        },
        // links
        userId: {
            type: String,
            require: true
        },
        ticketIds: {
            type: Array,
            default: []
        },
        // meta
        type: {
            type: String,
            // TODO: outline types
            enum: ['type1', 'type2'],
            require: true
        },
        category: {
            type: String,
            // TODO: outline categories
            enum: ['cat1', 'cat2'],
            require: true
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

const updateEvent = function (id, data, cb) {
    event.findByIdAndUpdate(id, data, cb)
}

const deleteEvent = function (id, cb) {
    event.findByIdAndDelete(id, cb)
}

module.exports = {
    getAllEvents: getAllEvents,
    getEventById: getEventById,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
}