import React, { useEffect } from 'react'
import { initialBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/usersReducer'
import { useSelector, useDispatch } from 'react-redux'
import Users from './components/Users'
import UserDet from './components/UserDet'
import Login from './components/Login'
import { Switch, Route } from "react-router-dom"
import ListBlogs from './components/ListBlogs'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

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
          <Route path="/users/:id">
            <UserDet users={users} />
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

