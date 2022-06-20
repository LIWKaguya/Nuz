const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const config = require('./utils/config')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const postsRouter = require('./controllers/posts')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB')
})
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app