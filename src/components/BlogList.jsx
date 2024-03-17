import React, { useState } from 'react'

const BlogList = ({ blogs, setBlogs, handleLike, handleRemove }) => {
  const [expandedBlogId, setExpandedBlogId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedBlogId((prevState) => (prevState === id ? null : id))
  }

  // Järjestä blogit likejen mukaisessa suuruusjärjestyksessä
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-10'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title'>Blogs</h2>
              <div className='list-group'>
                {sortedBlogs.map((blog) => (
                  <React.Fragment key={blog.id}>
                    <div className='list-group-item'>
                      <p>{blog.title}</p>
                      {/* Tarkista, onko user-kenttä määritelty ennen sen käyttöä */}
                      {blog.user && (
                        <p>Added by: {blog.user.username}</p>
                      )}
                      {expandedBlogId === blog.id && (
                        <div>
                          <p>Author: {blog.author}</p>
                          <p>Url: {blog.url}</p>
                          <p>Likes: {blog.likes}</p>
                        </div>
                      )}
                      <button
                        onClick={() => toggleExpand(blog.id)}
                        className='btn btn-primary mr-2'
                      >
                        {expandedBlogId === blog.id
                          ? 'Hide Details'
                          : 'Show Details'}
                      </button>
                      <button
                        onClick={() => handleLike(blog.id)}
                        className='btn btn-success'
                      >
                        Like
                      </button>
                      {/* Poista ylimääräinen </button> tästä */}
                      <button
                        onClick={() => handleRemove(blog.id)}
                        className='btn btn-danger'
                      >
                        Remove
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogList
