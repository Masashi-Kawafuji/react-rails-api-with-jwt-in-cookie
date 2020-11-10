import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import instance from './services/instance';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  Home,
  SignUp,
  SignIn,
  PostList
} from './pages';
import AuthenticationContext from 'contexts/AuthenticationContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [authorizedUser, setAuthorizedUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    instance.get('/auto_login')
      .then(response => {
        console.log('auto logged in.')
        console.log(response.data);
        const { data: attributes } = response.data;
        setAuthorizedUser(attributes);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleSignOutClick = event => {
    event.preventDefault();
    instance.delete('/logout')
      .then(response => {
        console.log(response);
        setAuthorizedUser(null);
        history.push('/sign-in');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <AuthenticationContext.Provider value={ }>
      <AuthenticationContext.Consumer>
        {({ isLoggedIn }) => (
          <React.Fragment>
            <Navbar bg="light" expand="sm">
              <Nav as='ul' className='ml-auto'>
                <Nav.Item as='li'>
                  <Nav.Link as={Link} to='/'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item as='li'>
                  <Nav.Link as={Link} to='/posts'>Posts</Nav.Link>
                </Nav.Item>
                {isLoggedIn ? (
                  <Nav.Item as='li'>
                    <Nav.Link onClick={handleSignOutClick}>Sign Out</Nav.Link>
                  </Nav.Item>
                ) : (
                    <>
                      <Nav.Item as='li'>
                        <Nav.Link as={Link} to='/sign-up'>Sign Up</Nav.Link>
                      </Nav.Item>
                      <Nav.Item as='li'>
                        <Nav.Link as={Link} to='/sign-in'>Sign In</Nav.Link>
                      </Nav.Item>
                    </>
                  )}
              </Nav>
            </Navbar>
            <Container>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/sign-up'>
                  <SignUp />
                </Route>
                <Route path='/sign-in'>
                  <SignIn />
                </Route>
                <Route path='/posts'>
                  <PostList />
                </Route>
              </Switch>
            </Container>
          </React.Fragment>
        )}
      </AuthenticationContext.Consumer>
    </AuthenticationContext.Provider>
  );
}

export default App;