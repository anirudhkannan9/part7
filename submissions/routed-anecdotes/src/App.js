import React, { useState } from 'react'
import { 
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import { useField } from './hooks'
import Menu from './components/Menu'
import Notification from './components/Notification'
import About from './components/About'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    return (<p>No anecdote with that ID was found</p>)
  }

  //const info = `https://${anecdote.info}`
  const info = anecdote.info
  
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <div>has {anecdote.votes} votes</div>
      <div>for more info, see <a href={info}>{anecdote.info}</a></div>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdotes app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: `https://${info.value}`,
      votes: 0
    })
    history.push('/')
    props.setNotification(`A new anecdote "${content.value}" created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)

  }

  const handleReset = () => {
    console.log(content)
    //content.reset()
    // author.onReset()
    // info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id='create-anecdote-form' onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <input type="submit" value="Submit"></input>
        <input type="reset" value="Reset"></input>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log('in addNew, anecdote looks like: ', anecdote)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === (match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      <Notification notif={notification}/>

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote}/>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/createnew">
          <CreateNew addNew={addNew} setNotification={setNotification}/>
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;