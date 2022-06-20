const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (_, res) => {
    const users = await User.find({}).populate('posts', {
        content: 1, comments: 1, likes: 1
    })

    res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body
    const existingUser = await User.findOne({ username })
    if ( existingUser ) {
        return res.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 7
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, 
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter

