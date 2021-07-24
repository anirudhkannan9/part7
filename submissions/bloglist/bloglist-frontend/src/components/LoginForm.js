import React, { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import { createNotif } from '../reducers/notifReducer'
import { useDispatch } from 'react-redux'
import { logInUserActionCreator } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const onLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            setUsername('')
            setPassword('')
            dispatch( createNotif( `Welcome back, ${ user.name }`, 7, 'success' ) )
            dispatch( logInUserActionCreator( user ) )
        } catch ( exception ) {
            dispatch( createNotif( 'wrong username/password', 7, 'error' ) )
        }
    }

    return (
        <div>
            <h2>Login to application </h2>
            <Notification/>

            <form onSubmit={ onLogin }>
                <div>
                    username :
                    <input
                        type='text'
                        value={ username }
                        onChange={ ( { target } ) => setUsername( target.value ) }
                    />
                </div>
                <div>
                    password :
                    <input
                        type='password'
                        value = { password }
                        onChange={ ( { target } ) => setPassword( target.value ) }
                    />
                </div>
                <button id='login'>login </button>
            </form>
        </div>
    )
}

export default LoginForm