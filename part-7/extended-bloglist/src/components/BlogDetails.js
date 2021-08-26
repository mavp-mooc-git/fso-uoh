import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import Notification from './Notification'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'

const BlogDetails = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()
  const history = useHistory()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const own = user.username === blog.user.username

  const handleLike = async (id) => {
      const blogToLike = blogs.find(b => b.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user }
      dispatch(updateBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    try {
      const blogToRemove = blogs.find(b => b.id === id)
      const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
      if (ok) {
        dispatch(deleteBlog(blogToRemove))
        dispatch(showNotification('blog has been deleted!', 'success'))
        history.push('/')
      }
    } catch(exception) {
      dispatch(showNotification(exception, 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if (!blog) {
    return (
      <>
        <h2>blogs</h2>
  
        <p> User {user.name} logged in </p>
        <button onClick={handleLogout}>logout</button>
  
        <p>data not available</p>
      </>
    )
  } else {
    return (
      <>
        <h2>blogs</h2>

        <Notification notification={notification} />
  
        <p> User {user.name} logged in </p>
        <button onClick={handleLogout}>logout</button>
  
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>{blog.likes} likes
          <button onClick={() => handleLike(blog.id)}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        <p>{own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}</p>
      </>
    )
  }
}

export default BlogDetails

