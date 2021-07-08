import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(state => state.notif)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notif.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  if ( !notif ) {
    return null
  } else {
    return (
      <div style={ style }>
        { notif.message }
      </div>
    )
  }
}

export default Notification