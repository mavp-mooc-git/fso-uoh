import loginService from '../services/login'
import { showNotification } from './notificationReducer'
import storage from '../utils/storage'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const setUser = () => {
  const data = storage.loadUser()
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: data
    })
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const content = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN',
        data: content
      })
      dispatch(showNotification(`${content.name} welcome back!`, 'success'))
      storage.saveUser(content)
    } catch(exception) {
      dispatch(showNotification('wrong username/password', 'error'))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
    storage.logoutUser()
  }
}

export default userReducer
