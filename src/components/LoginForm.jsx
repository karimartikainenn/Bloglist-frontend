// LoginForm.js
import React from "react";

const LoginForm = ({
  handleLogin,
  errorMessage,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <>
      <h2>log in to application</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary p-1 m-1">login</button>
      </form>
    </>
  );
};

export default LoginForm;
