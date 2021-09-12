import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries'

const Authors = ({show, data, setError }) => {
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState('select')
  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const selectStyle = {
    width: '90%',
    height: 30,
    fontSize: 16
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selected, born } })
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }
  const authors = data

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
        <select value={selected} style={selectStyle}
                onChange={({ target }) => setSelected(target.value)}>
          <option value="select">Select author ...</option>
          {authors.map((a, i) => <option key={i} value={a.name}>{a.name}</option>)}
        </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
