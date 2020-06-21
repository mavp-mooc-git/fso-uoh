const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(`Please provide the password as an argument:
  node mongo.js <password>`)
  process.exit(1)
}

const password = process.argv[2]

const server = `mongodb+srv://fullstack:${password}`
const cluster = `cluster.mongodb.net/`
const dbname = `person-app`
const options = `retryWrites=true&w=majority`
const url = `${server}@${cluster}${dbname}?${options}`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person
  .find({})
  .then(person=> {
    person.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
