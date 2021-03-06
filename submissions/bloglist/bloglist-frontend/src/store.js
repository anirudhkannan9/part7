import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    notif: notifReducer,
    blogs: blogReducer,
    user: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)


export default store