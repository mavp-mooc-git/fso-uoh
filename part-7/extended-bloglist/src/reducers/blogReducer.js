import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOG':
      return action.data
    default:
      return state
  }
}

export const initialBlogs = () => {
  return async dispatch => {
    const content = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: content
    })
  }
}

export const newBlog = content => {
  return async dispatch => {
    const newData = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newData
    })
  }
}

export default blogReducer
