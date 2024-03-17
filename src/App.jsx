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
    console.log("User is now: ", user);
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Define the notify function
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
    // Clear any previous error message when login succeeds
    setErrorMessage("");
  } catch (error) {
    // Update errorMessage state with the error message when login fails
    setErrorMessage(error.message);
    if (error.message === "Request failed with status code 401") {
      setErrorMessage("Invalid username or password");
    }
  }
};
  


  const noteFormRef = useRef();

  const addBlog = async (newObject) => {
    try {
      // Ensure token is set before making the API call
      blogService.setToken(user.token);
  
      const newBlog = await blogService.add(newObject);
      if (noteFormRef.current) {
        noteFormRef.current.toggleVisibility();
      }
      setBlogs(blogs.concat({ ...newBlog, user: { username: user.username } }));
      showNotification("Blogi lisätty onnistuneesti", "success");
    } catch (error) {
      showNotification("Blogin lisääminen epäonnistui", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    console.log("Logged out");
    console.log("User is now: ", null); // Log the user state after setting it to null
  };

  return (
    <div>
      {/* Näytä notifikaatio, jos sellainen on */}
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
          <BlogList blogs={blogs} />
          <br />
          <BlogForm ref={noteFormRef} addBlog={addBlog} errorMessage={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default App;
