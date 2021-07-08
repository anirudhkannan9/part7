const initialNotif = ''

export const createNotif = (message, seconds, type ) => {
    return async dispatch => {
        dispatch( {
            type: 'NEW_NOTIF',
            data: { message, type }
        } )
        setTimeout(() => {
            dispatch( {
                type: 'NEW_NOTIF',
                data: ''
             } )

        }, seconds * 1000)
    }
}

const notifReducer = (state = initialNotif, action ) => {
    switch ( action.type ) {
        case 'NEW_NOTIF':
            return action.data
        default: return state
    }
}

export default notifReducer