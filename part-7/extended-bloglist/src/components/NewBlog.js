import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'


const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      // Blog validation failed: likes: Path `likes` is required.
      title, author, url, likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button id="create" variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog

