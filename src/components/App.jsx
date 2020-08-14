import React from 'react';

import NavBar from "./NavBar/NavBar";
import {Container} from "@material-ui/core";

import './App.scss';

const App = (props) => {
  return (
    <Container maxWidth={false} className="voiq-app-container" wrap="nowrap">
      <NavBar userRole={props.userRole} activeItem={props.activeItem} />
      <div className="voiq-app-body">
        { props.children }
      </div>
    </Container>
  );
}

export default App;
