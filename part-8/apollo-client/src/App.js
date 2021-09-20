import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import {
  useLazyQuery, useQuery, useSubscription, useApolloClient
} from '@apollo/client'
import {
  ALL_AUTHORS, ALL_BOOKS, BOOKS_BY_GENRE, GET_ME, NEW_BOOK_ADDED
} from './queries'

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

  useEffect(() => {
    authors.refetch()
    getUser()
    getBooks({
      variables: { findGenre: genreUser }
    })
  }, [books]) // eslint-disable-line

  const [getBooks] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setListbooks(data.allBooks)
    }
  })
  const [getUser] = useLazyQuery(GET_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      //if(data && data.me) {
      if(data?.me) {
        getBooks({
          variables: { findGenre: data.me.favoriteGenre }
        })
        setGenreUser(data.me.favoriteGenre)
      }
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.title).includes(object.title)

    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : booksInStore.allBooks.concat(addedBook) }
      })
      const ifgen = addedBook.genres.filter(g => g === genreUser)
      if(ifgen.length > 0) {
        getBooks({
          variables: { findGenre: genreUser }
        })
      }
    }
  }

  useSubscription(NEW_BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      //notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
      window.alert(`${addedBook.title} added`)
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
        updateCacheWith={updateCacheWith}
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

