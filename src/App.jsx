import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import ThemeToggler from "./components/ThemeToggler";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token)
      console.log("user", user);
      console.log("user.token", user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (newObject) => {
    try {
      const newBlog = await blogService.create(newObject)
      setBlogs(blogs.concat({ ...newBlog, user: { username: user.username } }))
    } catch (error) {
      console.log("error", error);
      setErrorMessage("Error adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  return (
    <div>
      <ThemeToggler />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}

      {user && (
        <div className="container">
          <p>Welcome, {user.username}!</p>
          <button className="btn btn-primary p-1 m-1" onClick={handleLogout}>
            Logout
          </button>
          <BlogList blogs={blogs} />
          <br />
          <BlogForm addBlog={addBlog} errorMessage={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default App;
