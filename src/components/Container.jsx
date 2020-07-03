import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import Login from "./login/Login";
import Voicebots from "./voicebots/Voicebots";
import LoginService from "../services/LoginService";
import AuthenticationHelper from "../helpers/AuthenticationHelper";

const PrivateRoute = ({children, ...opts}) => {
  const history = useHistory();
  try {
    let token = localStorage.getItem("voiqToken");
    LoginService.authenticatedPing(
      token,
      (response) => {
        console.log("CALLBACK");
        console.log(response);
        // TODO: We need to standardize the responses and create/use error codes or HTTP error codes.
        if (response.error) {
          AuthenticationHelper.logout(history);
        }
      }
    );
  } catch (e) {
    AuthenticationHelper.logout(history);
  }

  return (
    <Route
      {...opts}
      render={() => {
        return children;
      }}
    />
  );
}

const Container = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute path="/voicebots">
        <Voicebots />
      </PrivateRoute>
      <Route path="*">
        <p>404</p>
        <p>TODO: Add real 404 page</p>
      </Route>
    </Switch>
  );
}

export default Container;