import React from 'react';

import DOMPurify from 'dompurify';
import { Box, Button, Grid, TextField } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

import LoginService from "../../../services/LoginService";
import Helpers from "../../../helpers/Utils";

import './Form.scss';
import '../../../styles/buttons.scss';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('The Password is required'),
  email: Yup.string()
    .email('The Email must be a valid email address.')
    .required('The Email is required')
});

const Form = () => {
  const [backendErrors, setBackendErrors] = React.useState([]);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (values) => {
    try {
      setBackendErrors([]);
      LoginService.authenticate(
        history,
        values.email,
        values.password,
        (response) => {
          if (response.error) {
            console.log(response.error);
            setBackendErrors([ response.error ]);
          } else {
            history.push("/voicebots");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const renderEmailField = () => {
    return (
      <Box className="voiq-field" textAlign="center">
        <TextField
          error={!Helpers.emptyObject(errors.email)}
          helperText={errors.email && errors.email.message ? errors.email.message : ''}
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
          autoFocus={true}
          inputRef={register}
        />
      </Box>
    );
  }

  const renderPasswordField = () => {
    return (
      <Box className="voiq-field voiq-login-password-field" textAlign="center">
        <TextField
          error={!Helpers.emptyObject(errors.password)}
          helperText={errors.password && errors.password.message ? errors.password.message : ''}
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          autoComplete="off"
          inputRef={register}
        />
      </Box>
    );
  }

  const renderTou = () => {
    return (
      <div
        className="tou"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            'By logging in to the VOIQ App, you are accepting the <a href="https://www.voiq.com/tou" target="_blank" rel="noopener noreferrer">Terms of Use</a> of VOIQ Inc.'
          ),
        }}
      />
    );
  }

  return (
    <Grid item>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form">
          { !Helpers.emptyArray(backendErrors) && (<Alert severity="error">{backendErrors}</Alert>)}
          { renderEmailField() }
          { renderPasswordField() }
        </div>
        { renderTou() }
        <Box textAlign="center">
          <Button type="submit" color="primary" className="voiq-button-primary voiq-login-button">
            Login
          </Button>
        </Box>
      </form>
    </Grid>
  );
}

export default Form;
