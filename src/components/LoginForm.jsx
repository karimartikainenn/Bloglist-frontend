import React from 'react'

const LoginForm = ({
  handleLogin,
  errorMessage,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title'>Log in to application</h2>
              {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
              <form onSubmit={handleLogin}>
                <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <button type='submit' className='btn btn-primary btn-block'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
