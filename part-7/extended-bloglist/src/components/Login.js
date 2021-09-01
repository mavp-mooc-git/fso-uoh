import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { loginUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'
import { ScInput, ScButton, ScLabel } from  '../utils/styledComponents'
import storeTheme from '../utils/theme'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const theme = storeTheme.loadTheme()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }) )
    setUsername('')
    setPassword('')
  }
  
  return (
    <div className={(theme.name === 'styled') ? ""  : "container"}>
      <h2>login to application</h2>

      <Notification notification={notification} />

      <form className={(theme.name === 'styled') ? "" : "form" }
        onSubmit={handleLogin}>
        <div className={(theme.name === 'styled') ? "" : "form group" }>
          {(theme.name === 'styled') ?
          <ScLabel htmlFor="username">username:</ScLabel> :
          <Form.Label>username:</Form.Label>}
          {(theme.name === 'styled') ?
          <ScInput
            type="text"
            name="username"
            value={username}
            placeholder="enter username"
            onChange={({ target }) => setUsername(target.value)}
          /> :
          <Form.Control
            type="text"
            name="username"
            value={username}
            placeholder="enter username"
            onChange={({ target }) => setUsername(target.value)}
          />}
        </div>

        <div className={(theme.name === 'styled') ? "" : "form group" }>
          {(theme.name === 'styled') ?
          <ScLabel htmlFor="password">password:</ScLabel> :
          <Form.Label>password:</Form.Label>}
          {(theme.name === 'styled') ?
          <ScInput
            type="password"
            id='password'
            value={password}
            placeholder="enter password"
            onChange={({ target }) => setPassword(target.value)}
          /> :
          <Form.Control
            type="password"
            id='password'
            value={password}
            placeholder="enter password"
            onChange={({ target }) => setPassword(target.value)}
          />}
        </div>

        <div className={(theme.name === 'styled') ? "" : "form group" }>
          {(theme.name === 'styled') ?
          <ScButton type="submit">
            login
          </ScButton> :
          <Button variant="primary" type="submit">
            login
          </Button>}
        </div>
      </form>
    </div>
  )
}

export default Login

