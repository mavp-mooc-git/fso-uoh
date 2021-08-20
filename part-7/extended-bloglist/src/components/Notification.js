import React from 'react'

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
    {notification.data}
  </div>
}

export default Notification

