import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showPersons, setShowPersons ] = useState('')
  const [ showMessage, setShowMessage ] = useState(null)
  const [typeClass, setTypeClass] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        //console.log('Fail promise', error)
        newMessage(error.toString(), 'fail')
      })
  }
  useEffect(hook, [])

  const newMessage = (msg, type) => {
    setShowMessage(msg)
    setTypeClass(type)
    setTimeout(() => {
      setShowMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const pname = persons.map(p => p.name)

    if(pname.indexOf(newName) !== -1) {
      const idx = pname.indexOf(newName)
      const pid = persons[idx].id
      window.alert(
        `${newName} is already added to phonebook, replace the old number with a new one.`
      );
      handleUpdate(pid)
    }
    else if(newName === "" || newNumber === "" ) {
      window.alert("name or number fields can't be empty");
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        newMessage(`Added: ${newName}`, 'msg')
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        //newMessage(error.toString(), 'fail')
        newMessage(JSON.stringify(error.response.data), 'fail')
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
      .then(() => {
        setPersons(newobj)
        newMessage(`Deleted person`, 'msg')
      })
      .catch(error => {
        //console.log('Fail handleDelete', error)
        newMessage(error.toString(), 'fail')
      })
    }
  }

  const handleUpdate = (id) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, name: newName, number: newNumber }
    personService
    .update(id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      newMessage(`Updated: ${newName}`, 'msg')
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.log('Fail handleUpdate', error)
      newMessage(`Information of ${newName} has already been removed from server`, 'fail')
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={showMessage} type={typeClass} />

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
