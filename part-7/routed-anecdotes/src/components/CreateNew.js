import React from 'react'
import useField from '../hooks'
import { useHistory } from "react-router-dom"

const CreateNew = (props) => {
  const {addNew, newMessage} = props
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
    newMessage(`a new anecdote: "${content.value}" created!`)
  }

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content &nbsp;
          <input name='content' {...content} />
        </div>
        <div>
          author &nbsp;
          <input name='author' {...author} />
        </div>
        <div>
          url for more info &nbsp;
          <input name='info' {...info} />
        </div>
        <br />
        <button type='submit'>create</button> &nbsp;
        <button type='reset'>reset</button>
      </form>
      <br />
    </div>
  )
}

export default CreateNew
