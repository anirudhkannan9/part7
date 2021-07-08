import './App.css'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import storage from './utils/storage'
import { createNotif } from './reducers/notifReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      dispatch(createNotif(`a new blog ${newBlog.title} by ${newBlog.author} added!`, 7, 'success'))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <LoginForm setUser={setUser} />
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

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
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