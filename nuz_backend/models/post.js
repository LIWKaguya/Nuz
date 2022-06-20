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

postSchema.set('toJSON', {
    transform: (_, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Post', postSchema)