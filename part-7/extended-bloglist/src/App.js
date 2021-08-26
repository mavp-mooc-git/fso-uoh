import React, { useEffect } from 'react'
import { initialBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import Users from './components/Users'
import Login from './components/Login'
import { Switch, Route } from "react-router-dom"
import ListBlogs from './components/ListBlogs'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(setUser())
    dispatch(initialBlogs())
  }, [dispatch])

  if ( !user ) {
    return <Login />
  } else {
    return (
      <div>
        <Switch>
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

