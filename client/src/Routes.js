import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './views/home';
import User from './views/user';
import Notfound from './views/notFound';
import GlobalStyle from './GlobalStyle';

const Routes = () => {
  return (
    <Router>
      <GlobalStyle/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:id" component={User} />
        <Route component={Notfound} />
      </Switch>
    </Router>
  );
};

export default Routes;