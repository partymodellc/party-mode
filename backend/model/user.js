const {Schema, model} = require('mongoose')
const logger = require('../logger')

const user = model('user', new Schema({
        // info
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        // data
        password: {
            type: String,
            require: true
        },
        provider: {
            type: String,
            require: true
        },
        membership: {
            type: String,
            enum: ['starter', 'member', 'creator'],
            default: 'starter'
        },
        image: {
            type: String
        },
        // links
        likes: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'user'
    }
))

const createUser = function (data, cb) {
    user.create(data, cb)
}

const getOrCreateUserByEmail = function (email, data, cb) {
    user.findOneAndUpdate(
        {email: email}, data, {upsert: true, new: true, runValidators: true}, cb
    )
}

const getUserById = function (id, cb) {
    user.findById(id, cb)
}

const getUserByEmail = function (email, cb) {
    user.findOne({email: email}, cb)
}

const updateUser = function (id, username, password, cb) {
    let filter = {
        username: username,
        password: password
    }

    Object.keys(filter).forEach(key => {
        if (filter[key] === undefined) {
            delete filter[key]
        }
    })

    user.findByIdAndUpdate(id, filter, cb)
}

const addUserLike = function (id, like, cb) {
    user.findByIdAndUpdate(id, {$addToSet: {likes: like}}, cb)
}

const removeUserLike = function (id, like, cb) {
    user.findByIdAndUpdate(id, {$pull: {likes: {$in: like}}}, cb)
}

module.exports = {
    createUser: createUser,
    getOrCreateUserByEmail: getOrCreateUserByEmail,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    updateUser: updateUser,
    addUserLike: addUserLike,
    removeUserLike: removeUserLike
}