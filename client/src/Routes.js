import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './views/home';
import User from './views/user';
// import Notfound from './views/notFound/NotFound';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:id" component={User} />
        {/* <Route component={Notfound} /> */}
      </Switch>
    </>
  );
};

export default Routes;