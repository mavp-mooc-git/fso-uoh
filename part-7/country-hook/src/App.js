import React, { useState } from 'react'
import useCountry from './hooks/useCountry'
import useField from './hooks/useField'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital: {country.data.capital} </div>
      <div>population: {country.data.population}</div>
      <br />
      <img src={country.data.flag} height='100'
        alt={`flag of ${country.data.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    setName('')
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} /> &nbsp;
        <button type='submit'>find</button>
      </form>
      <br />
      <Country country={country} />
    </div>
  )
}

export default App
