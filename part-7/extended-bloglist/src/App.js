import React, { useEffect } from 'react'
import { initialBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/usersReducer'
import { useSelector, useDispatch } from 'react-redux'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import Login from './components/Login'
import { Switch, Route } from "react-router-dom"
import ListBlogs from './components/ListBlogs'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(setUser())
    dispatch(initialBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  if ( !user || !users ) {
    return <Login />
  } else {
    return (
      <div>
        <Switch>
          <Route path="/blogs/:id">
            <BlogDetails blogs={blogs} />
          </Route>
          <Route path="/users/:id">
            <UserDetails users={users} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <ListBlogs />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App

