const postsRouter = require('express').Router()

const Post = require('../models/post')
const middleware = require('../utils/middleware')

postsRouter.get('/', async (_, res) => {
    const posts = await Post.find({})
    .populate('user', { username: 1, name: 1})

    res.status(200).json(posts)
})

postsRouter.post('/', middleware.userExtractor, async (req, res) => {
    const { content } = req.body
    const { user } = req
   
    const post = new Post({
        content,
        user
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
        user.posts = user.posts.filter(p => p._id.toString() !== post._id.toString())
        user.likedPosts = user.likedPosts.filter(p => p._id.toString() !== post._id.toString())
        await user.save()
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
    console.log(post)
    if(post.likedUsers.includes(user._id) && user.likedPosts.includes(post._id))
    {
        post.likedUsers = post.likedUsers.filter(u => u._id.toString() !==  user._id.toString())
        user.likedPosts = user.likedPosts.filter(p => p._id.toString() !==  post._id.toString())
    }
    else 
    {
        post.likedUsers = post.likedUsers.concat(user._id)
        user.likedPosts = user.likedPosts.concat(post._id)
    }
    const likedUser = await user.save()
    const likedPost = await Post.findByIdAndUpdate(req.params.id, post, {new: true}).populate('user', {username: 1, name: 1})
    res.status(200).json({ likedPost, likedUser })
})

module.exports = postsRouter