import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const aux = persons.map(p => p.name)
    if(aux.indexOf(newName) !== -1) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else if(newName === "" || newNumber === "" ) {
      window.alert("name or number fields can't be empty");
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleChangePersons = (event) => {
    setShowPersons(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={showPersons} event={handleChangePersons} />

      <h2>Add a new</h2>
      <PersonForm action={addPerson}
          valname={newName} evname={handleNameChange}
          valnumber={newNumber} evnumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons obj={persons} query={showPersons} />
    </div>
  )
}

export default App
