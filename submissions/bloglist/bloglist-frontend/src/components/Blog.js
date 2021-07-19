import React from 'react'
import { Link } from 'react-router-dom'

  const Blog = ( { blog } ) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></i> by {blog.author}
      </div>
    </div>
  )
}

export default Blog