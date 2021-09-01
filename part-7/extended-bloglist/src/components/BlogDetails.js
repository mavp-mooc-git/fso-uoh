import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import Notification from './Notification'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { initialComments, getComments,
         createComment, deleteComment } from '../reducers/commentReducer'
import { Form, Button } from 'react-bootstrap'
import { ScInput, ScButton} from  '../utils/styledComponents'
import storeTheme from '../utils/theme'


const BlogDetails = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()
  const history = useHistory()
  const notification = useSelector(state => state.notification)
  const comments = useSelector(state => state.comments)
  const user = useSelector(state => state.user)
  const own = user.username === blog.user.username
  const [review, setReview] = useState('')
  const theme = storeTheme.loadTheme()

  useEffect(() => {
    dispatch(initialComments(blogs))
    dispatch(getComments())
  }, [dispatch, blogs])

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(createComment(blog, review))
    dispatch(showNotification(`new comment '${review}' created!`, 'success'))
    setReview('')
  }

  const handleLike = async (id) => {
      const blogToLike = blogs.find(b => b.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user }
      dispatch(updateBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    try {
      const blogToRemove = blogs.find(b => b.id === id)
      const ok = window.confirm(`Remove blog '${blogToRemove.title}' by ${blogToRemove.author}`)
      if (ok) {
        dispatch(deleteBlog(blogToRemove))
        dispatch(showNotification('blog has been deleted!', 'success'))
        dispatch(deleteComment(blogToRemove.id))
        history.push('/')
      }
    } catch(exception) {
      dispatch(showNotification(exception, 'error'))
    }
  }

  if (!blog) {
    return (
      <p>data not available</p>
    )
  } else {
    return (
      <div className={(theme.name === 'styled') ? "" : "container"}>
        <Notification notification={notification} />

        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <table className={(theme.name === 'styled') ? "" : "table striped"}>
          <tbody>
            <tr>
              <td>
                {blog.likes} likes
              </td>
              <td>
              {(theme.name === 'styled') ?
              <ScButton onClick={() => handleLike(blog.id)}>
                like
              </ScButton> :
              <Button variant="secondary"
                onClick={() => handleLike(blog.id)}>
                like
              </Button>}
              </td>
            </tr>
          </tbody>
        </table>
        <p>added by {blog.user.name}</p>

        {own && (
            (theme.name === 'styled') ?
            <ScButton onClick={() => handleRemove(blog.id)}>
              remove
            </ScButton> :
            <Button variant="secondary"
              onClick={() => handleRemove(blog.id)}>
              remove
            </Button>
          )
        }

        <h3>comments:</h3>
        <form className={(theme.name === 'styled') ? "" : "form"}
          onSubmit={handleNewComment}>
          <div className={(theme.name === 'styled') ? "" : "form group"}>
            {(theme.name === 'styled') ?
            <ScInput
              type="text"
              name='review'
              value={review}
              placeholder="write a new comment"
              onChange={({ target }) => setReview(target.value)}
            /> :
            <Form.Control
              type="text"
              name='review'
              value={review}
              placeholder="write a new comment"
              onChange={({ target }) => setReview(target.value)}
            />}
            {(theme.name === 'styled') ?
            <ScButton id="add" type="submit">
              add comment
            </ScButton> :
            <Button variant="primary" id="add" type="submit">
              add comment
            </Button>}
          </div>
        </form>
        <ul>
          {comments.map((c, ix) => {
            let res = ''
            const d = c.desc
            if(c.id === id) {
              (d.length > 1) ? res = d.map((a, iy) => <li key={iy}>{a}</li>)
                              : res = <li key={ix}>{c.desc}</li>
            }
            return res
          } )}
        </ul>
      </div>
    )
  }
}

export default BlogDetails

