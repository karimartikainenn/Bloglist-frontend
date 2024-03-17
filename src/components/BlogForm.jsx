import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Toggleable from './Togglable'

const BlogForm = forwardRef(({ addBlog, errorMessage }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlogs = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility() {},
  }))

  return (
    <Toggleable buttonLabel='Create New Blog'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h2 className='card-title'>Create New Blog</h2>
                {errorMessage && (
                  <div className='alert alert-danger'>{errorMessage}</div>
                )}
                <form onSubmit={addBlogs}>
                  <div className='form-group'>
                    <label htmlFor='title'>Title:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      value={title}
                      onChange={({ target }) => setTitle(target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='author'>Author:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='author'
                      value={author}
                      onChange={({ target }) => setAuthor(target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='url'>Url:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='url'
                      value={url}
                      onChange={({ target }) => setUrl(target.value)}
                    />
                  </div>
                  <button
                    type='submit'
                    className='btn btn-primary btn-primary m-2 p-1'
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Toggleable>
  )
})

BlogForm.displayName = 'BlogForm'
export default BlogForm
