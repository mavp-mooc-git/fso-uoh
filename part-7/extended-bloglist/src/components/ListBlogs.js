import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'
import { showNotification } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'

const ListBlogs = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const createBlog = async (blog) => {
    blog.user = user
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(newBlog(blog))
      dispatch(showNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success'))
    } catch(exception) {
      dispatch(showNotification(exception, 'error'))
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <>
      <Notification notification={notification} />

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </>
  )
}

export default ListBlogs

