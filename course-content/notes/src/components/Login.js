import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Login = (props) => {
    const history = useHistory()
    //username: kannana1, pw: 'secret'
  
    const onSubmit = event => {
      event.preventDefault()
      props.onLogin('kannana1')
      //next line causes browser's url to change to '/'; app renders corresponding component <Home />
      history.push('/')
    }
  
    return (
      <div>
        <h2>Login</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>username: </Form.Label>
            <Form.Control type="text" name="username"/>
            <Form.Label>password: </Form.Label>
            <Form.Control type="password" name="password"/>
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
}
  

export default Login

