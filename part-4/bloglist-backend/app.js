const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
//const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const blogsRouter = require('./controllers/bloglists')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
