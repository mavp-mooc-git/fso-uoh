import React, { useState, useEffect } from 'react'
import { showNotification } from './reducers/notificationReducer'
import { initialBlogs, newBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(setUser())
    dispatch(initialBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }) )
    setUsername('')
    setPassword('')
  }

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

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
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
    </div>
  )
}

export default App

