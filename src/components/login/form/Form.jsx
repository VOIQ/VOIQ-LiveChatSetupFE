import DOMPurify from 'dompurify';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';

import Alert from './elements/Alert'
import LoginService from "../../../services/LoginService";
import { yupResolver } from '@hookform/resolvers';

import './Form.scss';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('The Password is required'),
  email: Yup.string()
    .email('The Email must be a valid email address.')
    .required('The Email is required')
})

const Form = () => {
  const [formErrors, setFormErrors] = React.useState([]);
  const history = useHistory();

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (values) => {
    try {
      console.log("SUBMITTING");
      console.log(values);
      LoginService.authenticate(
        values.email,
        values.password,
        (response) => {
          if (response.error) {
            console.log(response.error);
            setFormErrors([ response.error ])
          } else {
            console.log(response);
            history.push("/voicebots");
            localStorage.setItem('voiqToken', response.auth_token);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const renderEmailField = () => {
    return (
      <div className="voiq-field">
        <h3 className="voiq-field__title">Email</h3>
        <input
          className={`form-control voiq-field__Input ${errors.email ? 'is-invalid' : ''}`}
          name="email"
          type="text"
          placeholder="Enter your email"
          title="Email"
          autoFocus={true}
          ref={register}
        />
        <div className="invalid-feedback">{errors.email && errors.email.message ? errors.email.message : ''}</div>
      </div>
    );
  }

  const renderPasswordField = () => {
    return (
      <div className="voiq-field mt-5">
        <h3 className="voiq-field__title">Password</h3>
        <input
          className={`form-control voiq-field__Input ${errors.password ? 'is-invalid' : ''}`}
          name="password"
          type="password"
          placeholder="Enter your password"
          title="Password"
          autoComplete="off"
          ref={register}
        />
        <div className="invalid-feedback">{errors.password && errors.password.message ? errors.password.message : ''}</div>
      </div>
    );
  }

  const renderTou = () => {
    return (
      <div
        className="col-12 text-center tou"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            'By logging in to the VOIQ App, you are accepting the <a href="https://www.voiq.com/tou" target="_blank" rel="noopener noreferrer">Terms of Use</a> of VOIQ Inc.'
          ),
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row login-form mt-7">
        <div className="col-lg-3 col-md-4 col-sm-8 col-12 mx-auto">
          <Alert errors={formErrors}/>
          { renderEmailField() }
          { renderPasswordField() }
        </div>
      </div>
      <div className="row mt-5">
        { renderTou() }
      </div>
      <div className="row mt-2">
        <div className="col-lg-3 col-md-4 col-sm-8 col-12 mx-auto">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-voiq-success btn-100-width">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
