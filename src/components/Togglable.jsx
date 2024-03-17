import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={toggleVisibility} >
        {visible ? 'Hide' : 'Show'} {props.buttonLabel}
      </button>
      {visible && <div>{props.children}</div>}
    </div>
  )
}

export default Togglable
