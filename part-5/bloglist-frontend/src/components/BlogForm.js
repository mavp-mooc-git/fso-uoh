import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: &nbsp;
          <input
            id='title'
            type='text'
            value={newTitle}
            name='title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author: &nbsp;
          <input
            id='author'
            type='text'
            value={newAuthor}
            name='author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url: &nbsp;
          <input
            id='url'
            type='text'
            value={newUrl}
            name='url'
            onChange={handleUrlChange}
          />
        </div>
        <br />
        <div>
          <button id="create-btn" type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
