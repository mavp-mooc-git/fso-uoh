import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { loginUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'


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
    <div className="container">
      <h2>login to application</h2>

      <Notification notification={notification} />

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login

