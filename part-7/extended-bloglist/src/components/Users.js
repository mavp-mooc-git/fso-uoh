import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { getAllUsers } from '../reducers/usersReducer'
import { useHistory } from "react-router-dom"
import { Fragment } from 'react'
import { Link } from "react-router-dom"


const Users = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  return (
    <>
      <h2>blogs</h2>

      <p> User {user.name} logged in </p>
      <button onClick={handleLogout}>logout</button>

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) =>
            <Fragment key={idx}>
              <tr>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            </Fragment>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users

