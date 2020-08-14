import React, {useEffect} from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import App from "./App";
import AuthenticationHelper from "../helpers/AuthenticationHelper";
import Login from "./Login/Login";
import LoginService from "../services/LoginService";
import CreateVoicebot from "./Voicebots/CreateVoicebot/CreateVoicebot";
import Voicebots from "./Voicebots/Voicebots";
import {CircularProgress, Grid} from "@material-ui/core";
import EditVoicebot from "./Voicebots/EditVoicebot/EditVoicebot";

const PrivateRoute = ({children, ...props}) => {
  const history = useHistory();

  // TODO: Verify what happens if role doesn't have access
  useEffect(() => {
    try {
      LoginService.authenticatedPing(
        history,
        (response) => {
          // TODO: We need to standardize the responses and create/use error codes or HTTP error codes.
          if (response.error) {
            AuthenticationHelper.logout(history);
          } else {
            let roles = response.roles;
            props.setUserRole(AuthenticationHelper.highestHierarchyRole(roles));
          }
        }
      );
    } catch (e) {
      AuthenticationHelper.logout(history);
    }
  }, [history, props]);

  return (
    <Route
      {...props}
      render={() => {
        if (props.userRole) {
          return children;
        } else {
          return (
            <Grid container direction="row" alignItems="center" justify="center" className="voicebots-container">
              <CircularProgress className="voicebot-progress" />
            </Grid>
          );
        }
      }}
    />
  );
}

const Container = () => {
  const [userRole, setUserRole] = React.useState(null);

  // TODO: Active item string is one of the values of userRolePermissions.json, maybe add a constants file?
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute exact userRole={userRole} setUserRole={setUserRole} path="/voicebots">
        <App userRole={userRole} activeItem="voicebots">
          <Voicebots/>
        </App>
      </PrivateRoute>
      <PrivateRoute exact userRole={userRole} setUserRole={setUserRole} path="/voicebots/create">
        <App userRole={userRole}>
          <CreateVoicebot />
        </App>
      </PrivateRoute>
      <PrivateRoute exact userRole={userRole} setUserRole={setUserRole} path="/voicebots/edit/:id">
        <App userRole={userRole}>
          <EditVoicebot />
        </App>
      </PrivateRoute>
      <Route path="*">
        <p>404</p>
        <p>TODO: Add real 404 page</p>
      </Route>
    </Switch>
  );
}

export default Container;