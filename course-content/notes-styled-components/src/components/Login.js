import React from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

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
        <h2>login</h2>
        <form onSubmit={onSubmit}>
          <div>
            username: 
            <Input />
          </div>
          <div>
            password: 
            <Input type="password" />
          </div>
          <div>
            <Button type="submit" primary=''> login </Button>
              
          </div>          
        </form>
      </div>
    )
}
  

export default Login

