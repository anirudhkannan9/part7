import { React } from 'react'

const Notification = ({ notif }) => {
    if (!notif) {
      return null
    }
  
    return (
      <p>{notif}</p>
    )
}

export default Notification