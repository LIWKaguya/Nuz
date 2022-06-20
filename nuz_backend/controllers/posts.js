const postsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Post = require('../models/post')
const User = require('../models/user')

const getTokenFrom = ( req ) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('using ')) {
        return authorization.substring(6)
    }
    return null
}

postsRouter.get('/', async (_, res) => {
    const posts = await Post.find({}).populate('user', { username: 1, name: 1})

    res.status(200).json(posts)
})

postsRouter.post('/', async (req, res) => {
    const { content } = req.body

    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid '})
    }

    const user = await User.findById(decodedToken.id)

    const post = new Post({
        content,
        user: user._id
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    res.status(201).json(savedPost)
})

module.exports = postsRouter