import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username &nbsp;
          <input
            id='username'
            type='text'
            value={username}
            name='username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password &nbsp;
          <input
            id='password'
            type='password'
            value={password}
            name='password'
            onChange={handlePasswordChange}
          />
        </div>
        <br />
        <button id="login-button" type='submit'>
          login
        </button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
