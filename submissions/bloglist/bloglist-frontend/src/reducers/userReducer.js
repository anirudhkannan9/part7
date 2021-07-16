import storage from '../utils/storage'

const userReducer = (state = null, action) => {
    switch ( action.type ) {
        case 'LOG_IN':
            storage.saveUser(action.data)
            return action.data
        case 'LOG_OUT':
            storage.logoutUser()
            return null
        default: return state
    }
}

//action creators
export const logInUserActionCreator = user => {
    return {
        type: 'LOG_IN',
        data: user
    }
}

export const logOutUserActionCreator = () => {
    return {
        type: 'LOG_OUT'
    }
}

export default userReducer