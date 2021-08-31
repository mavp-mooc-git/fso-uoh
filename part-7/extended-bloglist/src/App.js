import React, { useEffect } from 'react'
import { initialBlogs } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/usersReducer'
import { useSelector, useDispatch } from 'react-redux'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import Login from './components/Login'
import { Link, Switch, Route, useHistory } from "react-router-dom"
import ListBlogs from './components/ListBlogs'
import { Button, Nav, Navbar } from 'react-bootstrap'


const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(setUser())
    dispatch(initialBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  if ( !user || !users ) {
    return (
      <div className="container">
        <Login />
      </div>
    )
  } else {
    return (
      <div className="container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                { user ? <strong>{user.name} logged in</strong>
                      : <Link style={padding} to="/">login</Link> }
              </Nav.Link>
              <Button variant="primary" onClick={handleLogout}>
                logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <h2>blog app</h2>
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

