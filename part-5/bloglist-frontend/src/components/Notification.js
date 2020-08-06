import React from 'react'

const Notification = ({ message, type }) => {
  const notclass = (type) ? `notif ${type}` : 'notif'
  if (message === null) {
    return null
  }

  return (
      <div className={notclass}>
        {message}
      </div>
  )
}

export default Notification
