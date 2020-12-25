import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let style = {
    border: 'solid',
    borderColor: 'green',
    display: 'block',
    padding: 10,
    borderWidth: 3
  }

  if (notification === '') {
    style = {
      display: 'none'
    }
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
