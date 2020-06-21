require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(p => p.toJSON()))
  })
})

app.get('/info', (request, response) => {
  response.send(console.log("Responds to: /info"))
})

app.get('/api/persons/:id', (request, response) => {
  response.send(console.log("Responds to: get /api/persons/:id"))
})

app.delete('/api/persons/:id', (request, response) => {
  response.send(console.log("Responds to: delete /api/persons/:id"))
})

morgan.token('rpost', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :rpost'))

app.post('/api/persons', (request, response) => {
  response.send(console.log("Responds to: post /api/persons"))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
