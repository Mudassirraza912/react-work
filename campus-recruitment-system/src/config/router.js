import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Screens from '../screens'

const Routes = () => (
  // <Router>
  //   <div>
  //     <Route exact path="/" component={Screens.App} />
  //     <Route path="/admin-dashboard" component={Screens.AdminDashboard} />
  //     <Route path="/admin-login" component={Screens.AdminLogin} />
  //   </div>  
  // </Router>

  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Screens.App} />
      <Route path="/admin-dashboard" component={Screens.AdminDashboard} />
      <Route path="/admin-login" component={Screens.AdminLogin} />
    </Switch>
  </BrowserRouter>
);


export default Routes;