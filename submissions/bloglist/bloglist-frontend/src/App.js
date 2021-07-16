import './App.css'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import { createNotif } from './reducers/notifReducer'
import { createNewBlogActionCreator, likeBlogActionCreator, removeBlogActionCreator, initializeBlogsActionCreator } from './reducers/blogReducer'
import { logOutUserActionCreator } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector( state => state.user )

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch( initializeBlogsActionCreator( blogs ) )
    })
  }, [dispatch])

  const blogFormRef = useRef()

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(createNewBlogActionCreator(newBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(createNotif(`a new blog ${newBlog.title} by ${newBlog.author} added!`, 7, 'success'))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch( likeBlogActionCreator( blogToLike ) )
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch( removeBlogActionCreator( blogToRemove ) )
    }
  }

  const handleLogout = () => dispatch( logOutUserActionCreator() )

  if ( !user ) {
    return (
      <LoginForm />
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={ blogFormRef }>
        <NewBlog createBlog={ createBlog } />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}

    </div>
  )
}

export default App