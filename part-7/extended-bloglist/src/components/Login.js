import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { loginUser } from '../reducers/userReducer'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }) )
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login to application</h2>

      <Notification notification={notification} />

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default Login

