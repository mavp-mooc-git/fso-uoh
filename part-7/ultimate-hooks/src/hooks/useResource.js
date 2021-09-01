import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(baseUrl)
        setResources(request.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [baseUrl])

  const create = async resource => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource
