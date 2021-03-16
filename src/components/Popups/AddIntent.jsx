import React, { useState } from 'react';

import {useHistory} from "react-router-dom";

import '../../styles/popups.scss';
import '../../styles/buttons.scss';
import 'reactjs-popup/dist/index.css';

import IntentsService from '../../services/IntentsService'
import UtterancesService from '../../services/UtterancesService'

import AddIcon from '@material-ui/icons/Add';
import Popup from 'reactjs-popup';
import { Button, TextField} from '@material-ui/core';

const AddIntent = (props) => {
  const history = useHistory();
  const [newIntentName, setNewIntentName] = useState("");
  const [errorText, setErrorText] = useState("");

  const onIntentNameChange = (event) => {
    setNewIntentName(event.target.value);
  }

  const addIntent = (intentTypeId, close) => {
    if (newIntentName) {
      IntentsService.create(
        intentTypeId, 
        props.voicebotId,
        newIntentName,
        props.codePrefix,
        history,
        (intentResponse) => {
          if (intentResponse.status === 200) {
            setErrorText("");
            UtterancesService.create(
              intentResponse.data.id, 
              newIntentName, 
              intentResponse.data.code, 
              history,
              (utteranceResponse) => {
                if (utteranceResponse.status === 200) {
                  props.setIntents(JSON.stringify([
                    ...JSON.parse(props.intents),
                    intentResponse.data
                  ]));
                  props.setSelectedUtterance(intentResponse.data.id);
                  props.updateIntentsAndAnswers(intentResponse.data.id);
                  setErrorText("");
                  close();
                } else if (utteranceResponse.status === 422) {
                  setErrorText(utteranceResponse.data.message);
                }
              });
          } else if (intentResponse.status === 422){
            setErrorText(intentResponse.data.message);
          }
        }
      );
    } else {
      setErrorText("Enter new intent name");
    }
  }

  const resetValues = () => {
    setNewIntentName("");
    setErrorText("");
  }

  return (
    <Popup
      trigger={<button className="button"> <AddIcon /> </button>}
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button 
            className="close" 
            onClick={() => {
              resetValues();
              close();
            }}>
            &times;
          </button>
          <div className="header"> CREATE NEW INTENT </div>
          <div className="content">
            <TextField
              error={!!errorText} 
              className="voiq-popup" 
              id="outlined-basic" 
              label="Enter the name of the intent" 
              variant="outlined"
              onBlur={onIntentNameChange}
              helperText={errorText}
            />
          </div>
          <div className="actions">
            <Button 
              className="voiq-button-primary" 
              onClick={() => {
                addIntent(
                  props.intentTypeId, 
                  function () {
                    close();
                  }
                );
              }}>
              SAVE
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AddIntent;
