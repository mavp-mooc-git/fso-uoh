const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action
    case 'CLEAR_NOTIFICATION':
      return null
    default: 
      return state
  }
}

let timeoutId

export const showNotification = (content, text) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
      msg: text
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: null,
        msg: null
      })
    }, 5000)
  }
}

export const clearNotification = (id) => ({
  type: 'CLEAR_NOTIFICATION',
  data: null,
  msg: null
  }
)

export default notificationReducer
