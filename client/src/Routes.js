import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './views/home';
import User from './views/user';
import Notfound from './views/notFound';
import GlobalStyle from './GlobalStyle';
import Appbar from './shared-components/Appbar';
// eslint-disable-next-line
import styled from 'styled-components/macro';

const Routes = () => {
  return (
    <Router>
      <GlobalStyle/>
      <Appbar/>
      <div
        css={`
          margin-top: 60px;
        `}
      >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:id" component={User} />
        <Route component={Notfound} />
      </Switch>
      </div>
    </Router>
  );
};





export default Routes;