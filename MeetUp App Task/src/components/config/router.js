import { Router, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import * as Screens from '../index'
import history from './history'
const Routes = () => (

    <Router history={history}>
        <div>
            <Route exact path="/" component={Screens.App} />
            <Route path="/Dashboard/:id" component={Screens.Dashboard} />
            <Route path="/proposals" component={Screens.PropReq} />
            <Route path="/setup-profile" component={Screens.Setup} />
            <Route path="/user/:name" component={Screens.Profile} />
        </div>
    </Router>

);


export default Routes;