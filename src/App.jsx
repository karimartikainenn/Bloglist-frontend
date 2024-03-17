import React, { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
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
  const [BlogFormVisible, setBlogFormVisible] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedInUser)
      );
      blogService.setToken(loggedInUser.token);
      setUser(loggedInUser);
      setUsername("");
      setPassword("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  const noteFormRef = useRef();

  const addBlog = async (newObject) => {
    try {
      blogService.setToken(user.token);
  
      const newBlog = await blogService.add(newObject);
      if (noteFormRef.current) {
        noteFormRef.current.toggleVisibility();
      }
      setBlogs(blogs.concat({ ...newBlog, user: { username: user.username } }));
      showNotification("Blog added successfully", "success");
    } catch (error) {
      showNotification("Failed to add blog", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleLike = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    try {
      const response = await blogService.update(id, updatedBlog);
      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: response.likes } : blog
        )
      );
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        showNotification("Blog removed successfully", "success");
      } catch (error) {
        showNotification("Failed to remove blog", "error");
      }
    }
  }

  return (
    <div>
      {notification && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}

      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div className="container">
          <p>Welcome, {user.username}!</p>
          <button className="btn btn-primary p-1 m-1" onClick={handleLogout}>
            Logout
          </button>
          <BlogList blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} />
          <br />
          <BlogForm ref={noteFormRef} addBlog={addBlog} errorMessage={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default App;
