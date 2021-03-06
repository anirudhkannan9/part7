import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import Header from './components/Header'

import blogService from './services/blogs'
import userService from './services/users'
import { createNotif } from './reducers/notifReducer'
import { createNewBlogActionCreator, likeBlogActionCreator, initializeBlogsActionCreator } from './reducers/blogReducer'
//import { removeBlogActionCreator } from './reducers/blogReducer'
import { logOutUserActionCreator } from './reducers/userReducer'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  //Paper
} from '@material-ui/core'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector( state => state.user )
  const [ users, setUsers ] = useState([])

  const tableElements = [
    {
      title: 'first element',
      id: 1
    },
    {
      title: 'second element',
      id: 2
    }
  ]

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch( initializeBlogsActionCreator( blogs ) )
      console.log(blogs)
      console.log(tableElements)
    })
    userService.getAllUsersService().then(usersReturned => {
      setUsers(usersReturned)
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

  // const handleRemove = async (id) => {
  //   const blogToRemove = blogs.find(b => b.id === id)
  //   const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
  //   if (ok) {
  //     await blogService.remove(id)
  //     dispatch( removeBlogActionCreator( blogToRemove ) )
  //   }
  // }

  // const handleLogin = (username, password) => {
  //   try
  // }

  const handleLogout = () => dispatch( logOutUserActionCreator() )

  if ( !user ) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const padding = { padding: 5 }
  const navBarStyle = { backgroundColor: 'lightGrey' }

  return (
    <Container >
      <div style={navBarStyle}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <Switch>
        <Route path="/users/:id">
          <Header />
          <User users={users}/>
        </Route>

        <Route path="/users">
          <Header />
          <Users users={users}/>
        </Route>

        <Route path="/blogs/:id">
          <Header />
          <SingleBlog blogs={blogs} handleLike={handleLike}/>
        </Route>

        <Route path="/">
        <div>
          <Header />

          <Togglable buttonLabel='create new blog' ref={ blogFormRef }>
            <NewBlog createBlog={ createBlog } />
          </Togglable>

          {blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              own={user.username===blog.user.username}
            />
          )}

          <h3>Table goes under here</h3>
          <TableContainer >
            <Table>
              <TableBody>
                {
                    tableElements.map(element => (
                    <TableRow key={element.id}>
                      <TableCell>
                        <i>{element.title}</i>
                      </TableCell>
                      <TableCell>
                        { element.id }
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>


        </div>
        </Route>

      </Switch>
    </Container>
  )
}

export default App