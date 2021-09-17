import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOKS_BY_GENRE, GET_ME } from './queries'

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
  const [genreBooks, setGenreBooks] = useState([])
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  const [listbooks, setListbooks] = useState(null)
  const [genreUser, setGenreUser] = useState('')

  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      // result.data === data
      setListbooks(result.data.allBooks)
    }
  })
  const [getUser, currUser] = useLazyQuery(GET_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      // currUser.data === data
      getBooks({
        variables: { findGenre: currUser.data.me.favoriteGenre }
      })
      setGenreUser(currUser.data.me.favoriteGenre)
    }
  })

  if (!token) {
    const data = localStorage.getItem('listbooks-user-token', token)
    if(data) setToken(data)
  }

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    setGenreBooks([])
    setGenreUser('')
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

  const list = (!books.data) ? null : books.data.allBooks
  let filterBooks = (genreBooks) ? list.filter(b => {
    return (b.genres.find(g => g === genreBooks))
  }) : null


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
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </>
      }
      </div>

      <Notify errorMessage={errorMessage} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken} setError={notify}
        setPage={setPage}   getUser={getUser}
      />

      <Authors
        show={page === 'authors'}
        data={(!authors.data) ? null : authors.data.allAuthors}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        filterBooks={filterBooks} token={token}
        genreBooks={genreBooks} setGenreBooks={setGenreBooks}
        data={(!books.data) ? null : books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify} setPage={setPage}
        genreUser={genreUser} getBooks={getBooks}
      />

      <Recommend
        show={page === 'recommend'}
        data={listbooks}
        genreUser={genreUser}
      />

    </div>
  )
}

export default App

