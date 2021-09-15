import React from 'react'

const Books = ({show, data, token, genre, setGenre, filter}) => {

  if (!show) {
    return null
  }

  const books = data
  const listbooks = (filter.length < 1) ? books : filter

  if (!books) {
    return (
      <>
        <h2>books</h2> <p>no data available</p>
      </>
    )
  }

  const divStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '2rem 1rem'
  }

  const btnStyle = {
    width: '6rem'
  }

  let genresbooks = books.map(b => b.genres).reduce((p, c) => [...p, ...c])
  let genres = genresbooks.filter((e, i) => genresbooks.indexOf(e) === i)

  return (
    <div>
      <h2>books</h2>
      {(genre.length > 0) ?
      <p>in genre: <strong>{genre}</strong> &nbsp;
        <button key="clear" style={btnStyle}
                onClick={() => setGenre([])}>
          <strong>clear filters</strong>
        </button>
      </p> : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          { listbooks.map((a) =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ) }
        </tbody>
      </table>
      {(token) ?
        <div style={divStyle}>
          {genres.map((g, i) => {
            return (
              <button key={i} style={btnStyle} value={g}
                      onClick={({ target }) => setGenre(target.value)}>{g}
              </button>
            )
          } )}
        </div> : null
      }
    </div>
  )
}

export default Books
