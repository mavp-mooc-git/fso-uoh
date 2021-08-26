import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      const ida = action.data.id
      return state.map(blog => blog.id !== ida ? blog : action.data)
    case 'DEL_BLOG':
      const idb = action.data.id
      return state.filter((item) => item.id !== idb)
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
    // fix error: create blog doesn't load user's name in NewBlog component
    const tempId = newData.user
    newData.user = {
      id : tempId,
      name : content.user.name,
      username : content.user.username
    }
    // end fix solution
    dispatch({
      type: 'NEW_BLOG',
      data: newData
    })
  }
}

export const deleteBlog = content => {
  return async dispatch => {
    await blogService.remove(content.id)
    dispatch({
      type: 'DEL_BLOG',
      data: content
    })
  }
}

export const updateBlog = content => {
  return async dispatch => {
    try {
      const newData = await blogService.update(content)
      newData.id = content.id
      newData.user = content.user
      dispatch({
        type: 'UPDATE_BLOG',
        data: newData
      })
      dispatch(showNotification(`${content.title} has been updated!`, 'success'))
    } catch(exception) {
      dispatch(showNotification(`${exception.name}: ${exception.message}`, 'error'))
    }
  }
}

export default blogReducer
