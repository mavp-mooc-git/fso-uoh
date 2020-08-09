import React, { useState } from 'react'

const Blog = ({ blog, likesUp, delBlog }) => {
  const [shown, setShown] = useState(false)

  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 10,
    border: 'solid',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 3
  }

  const delButton = {
    backgroundColor: '#FFB6C1'
  }

  const updateLikes = (upblog) => {
    likesUp({
      id: upblog.id,
      title: upblog.title,
      author: upblog.author,
      url: upblog.url,
      likes: upblog.likes+=1
    })
  }

  const details = () => {
    const uri = `http://${blog.url}`
    if(shown) {
      return (
        <div style={{ backgroundColor: '#F0FFFF' }}>
          {blog.title} &nbsp;
          <button
            type='button'
            onClick={() => setShown(false)}>
              hide
          </button>
          <br />
          <a href={uri} rel="noopener noreferrer"
            target='_blank'>{blog.url}</a>
          <br />
          likes {blog.likes} &nbsp;
          <button
            type='button'
            onClick={() => updateLikes(blog)}>
              like
          </button>
          <br />
          {blog.author}
          <br />
          <button
            type='button'
            style={delButton}
            onClick={() => delBlog(blog)}>
              Remove
          </button>
        </div>
      )
    }
    return (
      <p>
        {blog.title} &nbsp;
        <button
          type='button'
          onClick={() => setShown(true)}>
            view
        </button>
      </p>
    )
  }

  return (
    <div style={blogStyle}>
      {details()}
    </div>
  )}

export default Blog
