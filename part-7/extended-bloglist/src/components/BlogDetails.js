import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import Notification from './Notification'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { initialComments, getComments,
         createComment, deleteComment } from '../reducers/commentReducer'
import { Table, Form, Button } from 'react-bootstrap'


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
      <>
        <Notification notification={notification} />
  
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <Table striped>
          <tbody>
            <tr>
              <td>
                {blog.likes} likes
              </td>
              <td>
                <Button variant="secondary" onClick={() => handleLike(blog.id)}>
                  like
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <p>added by {blog.user.name}</p>
        {own&&<Button variant="secondary" onClick={() => handleRemove(blog.id)}>
          remove
        </Button>}

        <h3>comments:</h3>
        <Form onSubmit={handleNewComment}>
          <Form.Group>
            <Form.Control
              type="text"
              name='review'
              value={review}
              onChange={({ target }) => setReview(target.value)}
            />
            <Button variant="primary" id="add" type="submit">
              add comment
            </Button>
          </Form.Group>
        </Form>
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
      </>
    )
  }
}

export default BlogDetails

