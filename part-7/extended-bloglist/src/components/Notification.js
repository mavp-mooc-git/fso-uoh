import React from 'react'
import { Alert } from 'react-bootstrap'


const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.msg === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>
    <Alert>
      {notification.data}
    </Alert>
  </div>
}

export default Notification

