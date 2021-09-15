import React from 'react'

const Recommend = ({show, data, currUser}) => {

  if (!show) {
    return null
  }

  const books = data

  let genre = (currUser) ? currUser.data.me.favoriteGenre : null

  let listbooks = (currUser) ? books.filter(b => {
    return (b.genres.find(g => g === genre))
  }) : null

  if (!books) {
    return (
      <>
        <h2>books</h2> <p>no data available</p>
      </>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: <strong>{genre}</strong></p>

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
    </div>
  )
}

export default Recommend
