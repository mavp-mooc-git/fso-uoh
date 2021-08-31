import React from 'react'
import { useParams } from "react-router-dom"


const UserDetails = ({users}) => {
  const id = useParams().id
  const usr = users.find(u => u.id === id)

  if (!usr) {
    return (
      <>
        <h2>blogs</h2>

        <p>added blogs</p>
        <p>data not available</p>
      </>
    )
  } else {
    return (
      <>
        <h2>blogs</h2>
  
        <h2>{usr.name}</h2>
        <p>added blogs</p>
        <ul>
          {usr.blogs.map((u, idx) =>
            <li key={idx}>{u.title}</li>
          )}
        </ul>
      </>
    )
  }
}

export default UserDetails

