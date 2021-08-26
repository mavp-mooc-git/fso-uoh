import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const content = await usersService.getAllUsers()
    dispatch({
      type: 'GET_USERS',
      data: content
    })
  }
}

export default usersReducer
