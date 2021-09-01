import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Fragment } from 'react'
import { Link } from "react-router-dom"


const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <>
      <h2>Users</h2>
      <table className="table striped">
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

