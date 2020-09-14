import React, {useEffect, useState} from "react";

import * as UtterancesService from "../../../../../../services/UtterancesService";
import UtteranceResponsesService from "../../../../../../services/UtteranceResponsesService";
import './IntentUtterances.scss';

import {useHistory} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const IntentUtterances = (props) => {
  const history = useHistory();
  const [utterances, setUtterances] = useState("[]");
  const voicebotId = props.voicebotId;
  const selectedUtterance = props.selectedUtterance;
  const setSelectedUtterance = props.setSelectedUtterance;
  const setAnswers = props.setAnswers;

  useEffect(() => {
    UtterancesService.readAll(
      props.intentId,
      history,
      (response) => {
        setUtterances(JSON.stringify(response));
      }
    );
  }, [history, props, selectedUtterance, setAnswers, setSelectedUtterance, voicebotId]);

  useEffect(() => {
    UtteranceResponsesService.readAll(
      selectedUtterance,
      voicebotId,
      history,
      (intentResponse) => {
        setAnswers(JSON.stringify(intentResponse));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.generatedAt]);

  const onQuestionClick = (utteranceId) => {
    console.log(utteranceId);
    UtteranceResponsesService.readAll(
      utteranceId,
      props.voicebotId,
      history,
      (utterancesResponse) => {
        console.log(utterancesResponse);
        setSelectedUtterance(utteranceId);
        setAnswers(JSON.stringify(utterancesResponse));
      }
    );
  }

  return (
    <List component="nav" className="utterances-list">
      {
        JSON.parse(utterances) && JSON.parse(utterances).map((utterance) => (
            <ListItem
              button
              key={`${utterance.id}`}
              selected={utterance.id === selectedUtterance}
              onClick={() => {onQuestionClick(utterance.id)}}
              generated_at={props.generated_at}
            >
              <ListItemText primary={utterance.name} />
            </ListItem>
          )
        )
      }
    </List>
  );
}

export default IntentUtterances;
