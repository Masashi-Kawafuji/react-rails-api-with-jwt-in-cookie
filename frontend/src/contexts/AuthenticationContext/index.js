import React from 'react';

const initialValue = {
  authorizedUser: null,
  setAuthorizedUser: null,
  isLoggedIn: false
}
const AuthenticationContext = React.createContext(initialValue);

export default AuthenticationContext;
