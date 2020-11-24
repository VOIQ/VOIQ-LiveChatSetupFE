import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import {Helmet} from "react-helmet";

import Container from "./components/Container";

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>VOIQ | Browser Bot</title>
    </Helmet>
    <Router>
      <Container />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
