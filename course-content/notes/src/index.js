import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'
import Note from './components/Note'
import Notes from './components/Notes'
import Users from './components/Users'
import Login from './components/Login'
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  Redirect,
  useRouteMatch
} from 'react-router-dom'
import { Alert, Nav, Navbar } from 'react-bootstrap'


const App = () => {
  const [ notes, setNotes ] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ]) 

  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(null)

  const login = user => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5
  }

  //refactor to use useRouteMatch out here instead of useParams inside the <Note/> component.
  //abstract application logic out of components, facilitate modularity/reusability of components
  //every time the component is rendered (= every time the browser's URL changes), the useRouteMatch hook is executed
  //
  const match = useRouteMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div className='container'>
      {message && 
        <Alert variant="success">
          {message}
        </Alert>

      }

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/notes">notes</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user
                  ? <em>{user} logged in</em>
                  : <Link to="/login">login</Link>
                }
            </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Switch>
          <Route path="/notes/:id">
            <Note note={note}/>
          </Route>
          <Route path="/notes">
            <Notes notes={notes}/>
          </Route>
          <Route path="/users">
            { user ? <Users /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/login">
            <Login onLogin={login}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
    
  )
}

ReactDOM.render(
  //move router out here because we want to use useRouteMatch, which can't be used in the component defining the routed part of the application
  <Router>
    <App/>
  </Router>,
document.getElementById('root')
)