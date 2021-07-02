import React from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'

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
            <TextField label="username"/>
          </div>
          <div>
            <TextField label="password" type='password'/>
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </div>          
        </form>
      </div>
    )
}
  

export default Login

