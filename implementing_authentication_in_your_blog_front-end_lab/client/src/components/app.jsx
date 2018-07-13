import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BlogDisplay from './BlogDisplay';
import Home from './Home';
import AdminHome from './Admin/Home';
import AdminDisplay from './Admin/BlogDisplay';
import Login from './auth/login';
import Logout from './auth/logout';
import AuthButton from './auth/authButton';
import PrivateRoute from './auth/privateRoute';

class Navigation extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <AuthButton />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <PrivateRoute exact path="/admin" component={AdminHome} />
                        <PrivateRoute exact path="/admin/:id" component={AdminDisplay} />
                        <Route path="/:id" component={BlogDisplay} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;