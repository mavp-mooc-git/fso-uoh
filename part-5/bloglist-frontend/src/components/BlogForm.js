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
    <>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: &nbsp;
          <input type='text' value={newTitle} name='title'
                 onChange={handleTitleChange} />
        </div>
        <div>
          author: &nbsp;
          <input type='text' value={newAuthor} name='author'
                 onChange={handleAuthorChange} />
        </div>
        <div>
          url: &nbsp;
          <input type='text' value={newUrl} name='url'
                 onChange={handleUrlChange} />
        </div>
        <br />
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
