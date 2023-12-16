const {Schema, model} = require('mongoose')

const event = model('event', new Schema({
        // info
        title: {
            type: String,
            require: true,
        },
        summary: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String,
            require: true
        },
        images: {
            type: Array
        },
        // data
        location: {
            name: String,
            latitude: Number,
            longitude: Number
        },
        startDate: Date,
        endDate: Date,
        status: {
            type: String,
            require: true,
        },
        view: {
            type: String,
            default: "public"
        },
        userId: {
            type: String,
            require: true
        },
        type: {
            type: Array
        },
        ticketIds: {
            type: Array,
            default: [],
            require: true
        },
        // meta
        category: {
            type: Array
        },
        tags: {
            type: Array
        },
        likes: {
            type: Number,
            default: 0
        },
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