import React from 'react';
import {withRouter, Link} from 'react-router-dom';
//withrouter: not inside a component that's navigated to
//no history, cannot trigger navigation
import {isLoggedIn} from '../../services/user';

const AuthButton = withRouter( //pass in a stateless component here
  ({history}) => { //props, but destructuring so you're only getting history
      if (isLoggedIn()) { //if you're logged in you'll see a logout link, vice versa if you're logged out
          return <Link className="btn btn-info" to="/logout">Logout</Link>
      } else {
          return <Link className="btn btn-info" to="/login">Login</Link>
      }
  }  
);

export default AuthButton;