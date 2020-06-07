import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState('')
  const [listCountries, setListCountries] = useState([])
  const [showWeather, setShowWeather] = useState([])
  const [showCity, setShowCity] = useState('')

  const hook = () => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    }).catch((err) => console.log('Error: ',err));
  }
  useEffect(hook, [])

  const aux = countries.filter(p => {
    return p.name.toString().toLowerCase().indexOf(showCountries.toString().toLowerCase()) > -1
  })
  const long = aux.length

  const countryList = () => {
    let coun = ''
    const temp = () => aux.map(p => {
      if(long === 1) {
        coun = p.name
      }
      return coun
    })
    const result = temp()
    setListCountries(result[0])
  }
  useEffect(countryList, [showCountries])

  const climate = () => {
    let res = ''
    const temp = aux.map(p => {
      if(long === 1) {
        res = p
      }
      return {capital:res.capital, latlng:res.latlng}
    })
    const result = temp[0]
    let [capital, latlng] = ''
    if(result) {
      capital = result.capital
      latlng = result.latlng
    }
    setShowCity(capital)
    let [lat, lng] = ''
    latlng ? [lat, lng] = latlng : [lat, lng] = [-30, -71]
    const URL = 'http://api.openweathermap.org/data/2.5/onecall'
    const api_key = process.env.REACT_APP_API_KEY
    const urlweather = `${URL}?lat=${lat}&lon=${lng}&appid=${api_key}`
    axios
      .get(urlweather)
      .then(response => {
        setShowWeather(response.data)
    }).catch((err) => console.log(err));
  }
  useEffect(climate, [listCountries])

  const degToCompass = (num) => {
    while( num < 0 ) num += 360;
    while( num >= 360 ) num -= 360;
    let val = Math.round( (num -11.25 ) / 22.5 );
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
               "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[ Math.abs(val) ];
  }

  const Weather = ({data}) => {
    const imgStyle = {
      backgroundColor: 'rgb(68, 114, 194)'
    }
    const main = (data) ? data.current : ''
    const weather = (main) ? main.weather : ''
    const temperature = (main) ? main.temp : 0
    const icon = (weather) ? weather[0].icon : ''
    const speed = (main) ? main.wind_speed : 0
    const direction = (main) ? main.wind_deg : 0
    const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return (
      <>
      <h2>Weather in {showCity}</h2>
      <p>
        <strong>temperature: </strong>
        {(temperature-273.15).toFixed(2)} °Celsius
      </p>
      <img src={imgUrl} style={imgStyle} width="auto"
           height="100px" alt="icon weather" />
      <p>
        <strong>wind: </strong>
        {speed} km/h - direction {degToCompass(direction)} ({direction}°)
      </p>
      </>
    )
  }

  const handleShowCountries = (event) => {
    setShowCountries(event.target.value)
  }

  const handleSetCountry = (event) => {
    event.preventDefault()
    setShowCountries(event.target.id)
  }

  const content = () => {
    let result = ''

    if(long > 10) {
      result = <p>Too many matches, specify another filter.</p>
      return result
    }

    if(long > 1 && long < 10) {
      result = aux.map((p,i) => {
        return <p key={i}> {p.name} <button type="button" id={p.name}
                  onClick={handleSetCountry}>show</button> </p>
      })
      return result
    }

    if(long === 1) {
      const flag = aux[0].flag
      const lang = aux[0].languages.map((p,i) => {
        return <li key={i}>{p.name} - {p.nativeName}</li>
      })

      result = (
        <>
        <h1>{aux[0].name}</h1>
        <p>capital: {aux[0].capital} <br />
           population: {aux[0].population} people</p>
        <h2>language(s):</h2>
        <ul>
          {lang}
        </ul>
        <img src={flag} width="150px" height="auto" alt="flag country" />
        </>
      )
      return (
        <>
        {result}
        <Weather data={showWeather} />
        </>
      )
    }
  }

  return (
    <div className="App">
      <br />
      <form>
      find countries: <input value={showCountries} onChange={handleShowCountries} />
      {content()}
      </form>
    </div>
  )
}

export default App;
