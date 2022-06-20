const postsRouter = require('express').Router()

const Post = require('../models/post')
const middleware = require('../utils/middleware')

postsRouter.get('/', async (_, res) => {
    const posts = await Post.find({})
    .populate('user', { username: 1, name: 1})
    .populate('likedUsers', {username: 1, name: 1})

    res.status(200).json(posts)
})

postsRouter.post('/', middleware.userExtractor, async (req, res) => {
    const { content } = req.body
    const { user } = req
   
    const post = new Post({
        content,
        user: user._id
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    res.status(201).json(savedPost)
})

postsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const { user } = req
    const post = await Post.findById(req.params.id)
    if(post.user.toString() == user.id) {
        await post.remove()
        return res.status(204).end()
    }
    return res.status(403).json({
        error: 'user is not allowed'
    })
})

postsRouter.put('/:id/likes', middleware.userExtractor, async (req, res) => {
    const { user } = req
    const post = await Post.findById(req.params.id)
    if(post.likedUsers.includes(user._id)) {
        post.likedUsers = post.likedUsers.filter(id => id ===  user._id)
    }
    else {
        post.likedUsers = post.likedUsers.concat(user._id)
    }
    const likedPost = {
        ...post,
        likes: post.likedUsers.length
    }
    const newLikedPost = await Post.findByIdAndUpdate(req.params.id, likedPost, {new: true})
    res.status(200).json(newLikedPost)
})

module.exports = postsRouter