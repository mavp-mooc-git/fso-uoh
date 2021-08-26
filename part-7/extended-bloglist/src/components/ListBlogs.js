import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'
import { showNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import { newBlog, updateBlog, deleteBlog } from '../reducers/blogReducer'

const ListBlogs = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const createBlog = async (blog) => {
    blog.user = user
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(newBlog(blog))
      dispatch(showNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success'))
    } catch(exception) {
      dispatch(showNotification(exception, 'error'))
    }
  }

  const handleLike = async (id) => {
    try {
      const blogToLike = blogs.find(b => b.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user }
      dispatch(updateBlog(likedBlog))
      dispatch(showNotification(`${likedBlog.title} has been updated!`, 'success'))
    } catch(exception) {
      dispatch(showNotification(exception, 'error'))
    }
  }

  const handleRemove = async (id) => {
    try {
      const blogToRemove = blogs.find(b => b.id === id)
      const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
      if (ok) {
        dispatch(deleteBlog(blogToRemove))
        dispatch(showNotification('blog has been deleted!', 'success'))
      }
    } catch(exception) {
      dispatch(showNotification(exception, 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <>
    <h2>blogs</h2>

    <Notification notification={notification} />

    <p>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </p>

    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <NewBlog createBlog={createBlog} />
    </Togglable>

    {blogs.sort(byLikes).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        own={user.username === blog.user.username}
      />
    )}
  </>
  )
}

export default ListBlogs

