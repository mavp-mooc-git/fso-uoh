const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const morgan = require('morgan')

if (process.env.NODE_ENV !== 'test') {
  usersRouter.use(morgan('tiny'))
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

if (process.env.NODE_ENV !== 'test') {
  morgan.token('rpost', (request) => JSON.stringify(request.body))
  usersRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :rpost'))
}

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
