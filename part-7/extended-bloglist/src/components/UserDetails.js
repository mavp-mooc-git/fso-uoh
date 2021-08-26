import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"


const UserDetails = ({users}) => {
  const id = useParams().id
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()
  const usr = users.find(u => u.id === id)

  const handleLogout = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  if (!usr) {
    return (
      <>
        <h2>blogs</h2>
  
        <p> User {user.name} logged in </p>
        <button onClick={handleLogout}>logout</button>
  
        <p>added blogs</p>
        <p>data not available</p>
      </>
    )
  } else {
    return (
      <>
        <h2>blogs</h2>
  
        <p> User {user.name} logged in </p>
        <button onClick={handleLogout}>logout</button>
  
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

