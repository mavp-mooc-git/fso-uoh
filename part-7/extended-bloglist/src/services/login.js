import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

/**
 * Fix import/no-anonymous-default-export:
 * Assign object to a variable before exporting as module default
 * */
//export default { login }

const fns = { login }
export default fns
