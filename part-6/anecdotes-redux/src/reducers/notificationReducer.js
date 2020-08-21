const initmsg = ''

const notificationReducer = (state = initmsg, action) => {
  //console.log('state:', state)
  switch (action.type) {
    case 'NEW_MSG':
      return action.data
    case 'DEL_MSG':
      return initmsg
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_MSG',
      data: content,
      next: setTimeout(() => {
        dispatch(clearNotification())
      }, time * 1000)
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'DEL_MSG'
  }
}

export default notificationReducer
