import React from 'react';
import {Link} from "react-router-dom";

import Form from './form/Form';

import './Login.scss';
import '../../styles/buttons.scss'

const Login = () => {
  return (
    <div className="App container-fluid login-container pt-4">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12 col-12 mx-auto text-center">
          <img
            border="0"
            alt="VOIQ"
            src="/voiq-logo-blue.png"
            className="login-logo"
          />
        </div>
      </div>
      <Form/>
      <div className="row forgot-password mt-4">
        <div className="col-lg-3 col-md-4 col-sm-8 col-12 mx-auto text-center">
          <Link to="/login"> Forgot Your Password? </Link>
        </div>
      </div>
      <div className="row mt-1 website">
        <div className="col-lg-3 col-md-4 col-sm-8 col-12 mx-auto text-center">
          <a href="https://www.voiq.com">www.voiq.com</a>
        </div>
      </div>
    </div>
  );
}

export default Login
