import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";

import Container from "./components/Container";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Container />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
