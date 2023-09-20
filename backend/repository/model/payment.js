const {Schema, model} = require('mongoose')

const payment = model('payment', new Schema({
        type: {
            type: String,
            enum: ['membership', 'ticket'],
            default: 'membership',
        },
        amount: {
            type: Number,
        },
        userId: {
            type: String,
        },
        correlationType: {
            type: String,
            enum: ['ticket'],
            default: 'event',
        },
        correlationId: {
            type: String,
        },
        status: {
            type: String,
            enum: ['completed', 'processing'],
            default: 'processing',
        },
    },
    {
        timestamps: true,
        collection: 'payment'
    }
))

// module.exports =