import React from 'react'

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
          <input type='text' value={username} name='username'
                 onChange={handleUsernameChange} />
        </div>
        <div>
          password &nbsp;
          <input type='password' value={password} name='password'
                 onChange={handlePasswordChange} />
        </div>
        <br />
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
