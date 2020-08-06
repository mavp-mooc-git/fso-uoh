import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [showMessage, setShowMessage] = useState(null)
  const [typeClass, setTypeClass] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    const aux = blogs.map(p => p.title)

    if(aux.indexOf(newTitle) !== -1) {
      newMessage(`${newTitle} is already added to blog`, 'fail')
    }
    else if(newTitle === "" || newAuthor === "" || newUrl === "" ) {
      newMessage('title, author or url fields can\'t be empty', 'fail')
    } else {
      await blogService
        .create(blogObject)
        .then(response => {
          setBlogs(blogs.concat(response))
          newMessage(`a new blog: ${newTitle} added`, 'msg')
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
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
      <>
        <h2>log in to application</h2>
        <Notification message={showMessage} type={typeClass} />
        <form onSubmit={handleLogin}>
          <div>
            username &nbsp;
            <input type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password &nbsp;
            <input type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }

  const blogsDetails = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={showMessage} type={typeClass} />
        <p>
          {user.name} logged-in &nbsp;
          <button type="button" onClick={handleLogout}>logout</button>
        </p>
        <h3>create new blog</h3>
        <form onSubmit={addBlog}>
          <div>
            title: &nbsp;
            <input type='text' value={newTitle} name='newTitle'
            onChange={({ target }) => setNewTitle(target.value)} />
          </div>
          <div>
            author: &nbsp;
            <input type='text' value={newAuthor} name='newAuthor'
            onChange={({ target }) => setNewAuthor(target.value)} />
          </div>
          <div>
            url: &nbsp;
            <input type='text' value={newUrl} name='newUrl'
            onChange={({ target }) => setNewUrl(target.value)} />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
        {blogs.map(blog => {
          if(blog.hasOwnProperty('user')) {
            if(blog.user.name === user.name ) {
              return <Blog key={blog.id} blog={blog} />
            }
          }
          return false
        } )}
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
