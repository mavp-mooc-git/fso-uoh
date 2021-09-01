import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const hook = useCallback(async () => {
    try {
      const url = 'https://restcountries.eu/rest/v2/'
      const param = `name/${name}?fullText=true`
      if(name) {
        const response = await axios.get(`${url}${param}`)
        setCountry({ found: true, data: response.data[0] })
      }
    } catch (error) {
      setCountry({ found: false })
    }
  }, [name])

  useEffect(() => {
    hook()
  }, [hook])


  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://restcountries.eu/rest/v2/'
        const param = `name/${name}?fullText=true`
        if(name) {
          const response = await axios.get(`${url}${param}`)
          setCountry({ found: true, data: response.data[0] })
        }
      } catch (error) {
        setCountry({ found: false });
      }
    }
    fetchData()
  }, [name])*/

  return country
}

export default useCountry
