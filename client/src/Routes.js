import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './views/home';
import User from './views/user';
import Notfound from './views/notFound';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components/macro';

const Routes = () => {
  return (
    <Router>
      <GlobalStyle/>
      <Appbar/>
      <div
        css={`
          margin-top: 70px;
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

const Appbar = styled.div`
  height: 70px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #ed673b;
`



export default Routes;