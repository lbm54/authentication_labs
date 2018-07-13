import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BlogDisplay from './BlogDisplay';
import Home from './Home';

class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/:id" component={BlogDisplay} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;