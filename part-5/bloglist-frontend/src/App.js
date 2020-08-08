import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showMessage, setShowMessage] = useState(null)
  const [typeClass, setTypeClass] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
      .catch(error => {
        newMessage(error.toString(), 'fail')
      })
  }, [])

  const newMessage = (msg, type) => {
    setShowMessage(msg)
    setTypeClass(type)
    setTimeout(() => {
      setShowMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateList = async () => {
    try {
      await blogService.getAll()
        .then(blogs => setBlogs(blogs))
        .catch(error => {
          newMessage(error.toString(), 'fail')
        })
    } catch (exception) {
      newMessage(exception.toString(), 'fail')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
        )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      newMessage(exception.toString(), 'fail')
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const aux = blogs.map(p => p.title)

    if(aux.indexOf(blogObject.title) !== -1) {
      newMessage(`${blogObject.title} is already added to blog`, 'fail')
    }
    else if(blogObject.title === '' ||
            blogObject.author === '' ||
            blogObject.url === '' ) {
      newMessage('title, author or url fields can\'t be empty', 'fail')
    } else {
      await blogService
        .create(blogObject)
        .then(response => {
          setBlogs(blogs.concat(response))
          newMessage(`a new blog: ${blogObject.title} added`, 'msg')
        })
        .catch(error => {
          newMessage(error.toString(), 'fail')
        })
      // added because blog list doesn't refresh
      updateList()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear() - clear all localstorage
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <h1>BLOGS</h1>
        <Notification message={showMessage} type={typeClass} />
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const blogsDetails = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={showMessage} type={typeClass} />
        <p>
          {user.name} logged-in &nbsp;
          <button type='button' onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div>
          {blogs.map(blog => {
            if(blog.hasOwnProperty('user')) {
              if(blog.user.name === user.name ) {
                return <Blog key={blog.id} blog={blog} />
              }
            }
            return false
          } )}
        </div>
      </div>
    )
  }

  return (
    <>
      {user === null ?
        loginForm() :
        blogsDetails()
      }
    </>
  )
}

export default App
