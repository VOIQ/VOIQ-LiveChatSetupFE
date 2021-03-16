import React, { useEffect, useState } from 'react';

import {useHistory} from 'react-router-dom';

import './IntentTypes.scss';

import IntentTypesService from '../../../../../../services/IntentTypesService';
import Intents from './Intents';

const IntentTypes = (props) => {
  const history = useHistory();
  const [intentTypes, setIntentTypes] = useState("[]");
  const intentsWithAddOption = ["FAQ"];

  useEffect(() => {
    IntentTypesService.read(
      props.voicebotId,
      history,
      (response) => {
        let responseIntentTypes = [];
        let i = 0;
        response.forEach(intentType => {
          responseIntentTypes[i] = {
            intent_type: intentType['intent_type'],
            can_create: intentType['can_create']
          }
          i++;
        });
        setIntentTypes(JSON.stringify(responseIntentTypes));
      }
    );
  }, [history, props.voicebotId, intentTypes]);

  return (
    JSON.parse(intentTypes) && JSON.parse(intentTypes).map((intentType, index) => (
      <div className="intent-type" key={index}>
        <Intents
          intentType={intentType.intent_type}
          canCreate={intentType.can_create}
          index={index}
          intentsWithAddOption={intentsWithAddOption}
          setAnswers={props.setAnswers}
          answers={props.answers}
          setExamples={props.setExamples}
          examples={props.examples}
          intentTypeId={intentType.intent_type.id}
          setSelectedUtterance={props.setSelectedUtterance}
          selectedUtterance={props.selectedUtterance}
          voicebotId={props.voicebotId}
        />
      </div>
      )
    )
  );
}
export default IntentTypes;
