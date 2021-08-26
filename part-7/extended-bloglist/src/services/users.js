import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const fns = { getAllUsers }
export default fns
