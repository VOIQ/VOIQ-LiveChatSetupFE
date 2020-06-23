import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./login/Login";
import First from "./First";

function Container() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/first">
        <First />
      </Route>
      <Route path="*">
        <p>404</p>
        <p>TODO: Add real 404 page</p>
      </Route>
    </Switch>
  );
}

export default Container;