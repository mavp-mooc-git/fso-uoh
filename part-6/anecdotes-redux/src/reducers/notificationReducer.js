const initmsg = ''
let pause = null

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
    pause = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
    dispatch({
      type: 'NEW_MSG',
      data: content,
      time: pause
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'DEL_MSG',
    data: '',
    time: clearTimeout(pause)
  }
}

export default notificationReducer
