import React from 'react';

import Form from './Form/Form';
import './Login.scss';

import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";

const Login = () => {
  return (
    <Container className="login-container">
      <Grid container spacing={3} direction="column" justify="center" alignItems="center" className="login-container">
        <Grid item>
          <img
            border="0"
            alt="VOIQ"
            src="/voiq-logo-blue.png"
            className="login-logo"
          />
        </Grid>
        <Form />
        <Grid item className="forgot-password mt-4">
          <Link to="/login"> Forgot Your Password? </Link>
        </Grid>
        <Grid item className="website">
          <a href="https://www.voiq.com">www.voiq.com</a>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login
