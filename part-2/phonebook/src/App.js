import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons ] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('Fail promise', error)
      })
  }
  useEffect(hook, [])

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
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('Fail promise', error)
      })
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

  const handleDelete = (id, obj) => {
    const delname = () => obj.filter(p => p.id.toString().toLowerCase().indexOf(id.toString().toLowerCase()) !== -1)
    const newobj = () => obj.filter(p => p.id.toString().toLowerCase().indexOf(id.toString().toLowerCase()) === -1)
    const elem = delname()[0].name
    if (window.confirm(`Do you want to delete ${elem}?`)) {
      personService
      .remove(id)
      .then(setPersons(newobj))
      .catch(error => {
        console.log('Fail handleDelete', error)
      })
    }
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
      <Persons obj={persons} query={showPersons} callback={handleDelete} />
    </div>
  )
}

export default App
