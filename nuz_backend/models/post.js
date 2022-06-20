const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: String,
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Post', postSchema)