import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  const style = {
    color: 'red',
    background: 'bisque',
    border: '2px solid red',
    marginTop: 15,
    marginBottom: 15,
    padding: 10
  }

  return (
    <div style={style}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState([])
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  if (!token) {
    const data = localStorage.getItem('listbooks-user-token', token)
    if(data) setToken(data)
  }

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    setGenre([])
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
        </>
      {(!token) ?
        <button onClick={() => setPage('login')}>login</button>
      :
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>logout</button>
        </>
      }
      </div>

      <Notify errorMessage={errorMessage} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
        data={(!authors.data) ? null : authors.data.allAuthors}
        setError={notify}
      />

      <Books
        show={page === 'books'} token={token}
        genre={genre} setGenre={setGenre}
        data={(!books.data) ? null : books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
        setPage={setPage}
      />

    </div>
  )
}

export default App

