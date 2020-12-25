import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    votes: 0
  }

  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateData = async (data) => {
  const object = {
    content: data.content,
    id: data.id,
    votes: data.votes + 1
  }
  
  const response = await axios.put(`${baseUrl}/${data.id}`, object)
  return response.data
}

export default {
  getAll,
  createNew,
  updateData
}
