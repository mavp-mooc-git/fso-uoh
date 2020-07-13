const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
//const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const blogsRouter = require('./controllers/bloglists')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(morgan('tiny'))
app.use(cors())
//app.use(bodyParser.json())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
