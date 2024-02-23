const {Schema, model} = require('mongoose')

const comment = model('comment', new Schema({
        // data
        text: {
            type: String
        },
        // links
        eventId: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: 'comment'
    }
))

// module.exports =