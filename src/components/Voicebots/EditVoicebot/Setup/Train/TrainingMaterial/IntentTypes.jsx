import React, { useEffect, useState } from 'react';

import {useHistory} from "react-router-dom";

import './IntentTypes.scss';

import IntentTypesService from "../../../../../../services/IntentTypesService";
import Intents from './Intents';
import { Card, CardContent, Container, Typography } from '@material-ui/core';


const IntentTypes = (props) => {
  const history = useHistory();
  const [intentTypes, setIntentTypes] = useState("[]");

  useEffect(() => {
    IntentTypesService.read(
      props.voicebotId,
      history,
      (response) => {
        setIntentTypes(JSON.stringify(response));
      }
    );
  }, [history, props.voicebotId, intentTypes]);

  return (
    <Container>
      {
        JSON.parse(intentTypes) && JSON.parse(intentTypes).map((intentType, index) => (
          <div className="intent-type" key={index}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h4">
                  {intentType.name}
                </Typography>
                <div className="intents">
                  <Intents
                    setAnswers={props.setAnswers}
                    answers={props.answers}
                    setExamples={props.setExamples}
                    examples={props.examples}
                    intentTypeId={intentType.id}
                    setSelectedUtterance={props.setSelectedUtterance}
                    selectedUtterance={props.selectedUtterance}
                    voicebotId={props.voicebotId}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          )
        )
      }
    </Container>
  );
}

export default IntentTypes;
