import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ showCountries, setShowCountries] = useState('')

  const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  const handleShowCountries = (event) => {
    setShowCountries(event.target.value)
  }

  const handleSetCountry = (event) => {
    event.preventDefault()
    setShowCountries(event.target.id)
  }

  const rows = () => {
    const aux = countries.filter(p => p.name.toLowerCase().indexOf(showCountries.toLowerCase()) > -1)
    const long = aux.length
    let result = ''

    if(long > 10) {
      return <p>Too many matches, specify another filter.</p>
    }

    if(long > 1 && long < 10) {
      result = aux.map((p,i) => {
        return <p key={i}> {p.name} <button type="button" id={p.name} onClick={handleSetCountry}>show</button> </p>
      })
      return result
    }

    if(long === 1) {
      result = aux.map(p => {
        return p
      })
      const data = result
      const flag = data[0].flag
      const lang = data[0].languages.map((p,i) => {
        return <li key={i}>{p.name} - {p.nativeName}</li>
      })
      return (
        <>
        <h1>{data[0].name}</h1>
        <p>capital: {data[0].capital} <br />
           population: {data[0].population} people</p>
        <h2>language(s):</h2>
        <ul>
          {lang}
        </ul>
        <img src={flag} width="150px" height="auto" alt="flag country" />
        </>
      )
    }
  }

  return (
    <div className="App">
      <form>
        <br />
        find countries: &nbsp;
        <input value={showCountries} onChange={handleShowCountries} />
        {rows()}
      </form>
    </div>
  );
}

export default App;
