import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ScInput, ScButton, ScLabel } from  '../utils/styledComponents'
import storeTheme from '../utils/theme'


const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const theme = storeTheme.loadTheme()

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url, likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  
  return (
    <div className={(theme.name === 'styled') ? "" : "container"}>
      <h2>create new</h2>
      <form className={(theme.name === 'styled') ? "" : "form"}
        onSubmit={handleNewBlog}>
        <div className={(theme.name === 'styled') ? "" : "form group" }>
          {(theme.name === 'styled') ?
          <ScLabel htmlFor="author">author:</ScLabel> :
          <Form.Label>author:</Form.Label>}
          {(theme.name === 'styled') ?
          <ScInput
            type="text"
            name="author"
            value={author}
            placeholder="enter author"
            onChange={({ target }) => setAuthor(target.value)}
          /> :
          <Form.Control
            type="text"
            name="author"
            value={author}
            placeholder="enter author"
            onChange={({ target }) => setAuthor(target.value)}
          />}
        </div>

        <div className={(theme.name === 'styled') ? "" : "form group" }>
          {(theme.name === 'styled') ?
          <ScLabel htmlFor="title">title:</ScLabel> :
          <Form.Label>title:</Form.Label>}
          {(theme.name === 'styled') ?
          <ScInput
            type="text"
            name="title"
            value={title}
            placeholder="enter title"
            onChange={({ target }) => setTitle(target.value)}
          /> :
          <Form.Control
            type="text"
            name="title"
            value={title}
            placeholder="enter title"
            onChange={({ target }) => setTitle(target.value)}
          />}
        </div>

        <div className={(theme.name === 'styled') ? "" : "form group" }>
          {(theme.name === 'styled') ?
          <ScLabel htmlFor="url">url:</ScLabel> :
          <Form.Label>url:</Form.Label>}
          {(theme.name === 'styled') ?
          <ScInput
            type="text"
            name="url"
            value={url}
            placeholder="enter blog url"
            onChange={({ target }) => setUrl(target.value)}
          /> :
          <Form.Control
            type="text"
            name="url"
            value={url}
            placeholder="enter blog url"
            onChange={({ target }) => setUrl(target.value)}
          />}
        </div>

        <div className={(theme.name === 'styled') ? "" : "form group" }>
          {(theme.name === 'styled') ?
          <ScButton id="create" type="submit">
            create
          </ScButton> :
          <Button id="create" variant="primary" type="submit">
            create
          </Button>}
        </div>
      </form>
    </div>
  )
}

export default NewBlog

