import React from 'react';

import CloudDoneIcon from '@material-ui/icons/CloudDone';
import ItemTable from "../../../../../Utils/ItemTable"
import {useHistory} from "react-router-dom";

import UtteranceResponsesService from "../../../../../../services/UtteranceResponsesService";
import Intents from './Intents';
import { Container } from '@material-ui/core';

const IntentTypes = (props) => {
  const history = useHistory();
  const intentTypes = ["FAQ", "Path", "General"]

  

  return (
    <Container>
      {
        intentTypes.map((intent) => (
            <Intents 
              intent={intent}
            />
          )
        )
      }
    </Container>
  );
}

export default IntentTypes;
