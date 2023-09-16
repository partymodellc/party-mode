const {Schema, model} = require('mongoose');

const comment = model('comment', new Schema({
        text: {
            type: String
        },
        userId: {
            type: String,
            require: true,
        },
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