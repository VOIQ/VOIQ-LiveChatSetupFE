import React, {useEffect, useState} from "react";

import IntentsService from "../../../../../../services/IntentsService";
import UtteranceResponsesService from "../../../../../../services/UtteranceResponsesService";
import IntentExamplesService from "../../../../../../services/IntentExamplesService";

import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import { ListItem, ListItemText, Typography } from "@material-ui/core";

const Intents = (props) => {
  const history = useHistory();
  const setAnswers = props.setAnswers;
  const setExamples = props.setExamples;
  const intentTypeId = props.intentTypeId;
  const [intents, setIntents] = useState("[]");
  const selectedUtterance = props.selectedUtterance;
  const setSelectedUtterance = props.setSelectedUtterance;
  const voicebotId = props.voicebotId;

  useEffect(() => {
    IntentsService.read(
      intentTypeId,
      voicebotId,
      history,
      (response) => {
        setIntents(JSON.stringify(response));
      }
    );
  }, [history, intentTypeId, setIntents, voicebotId]);

  const onQuestionClick = (utteranceId) => {
    UtteranceResponsesService.readAll(
      utteranceId,
      props.voicebotId,
      history,
      (utterancesResponse) => {
        setSelectedUtterance(utteranceId);
        utterancesResponse.forEach(answer => 
          answer.audio_id ? answer.should_show_optional_icon = true : answer.should_show_optional_icon = false
        );
        setAnswers(JSON.stringify(utterancesResponse));
      }
    );
    IntentExamplesService.readAll(
      utteranceId,
      history,
      (utterancesResponse) => {
        setSelectedUtterance(utteranceId);
        setExamples(JSON.stringify(utterancesResponse));
      }
    );


  }
  return (
    <Container>
      <Typography>{props.intent}</Typography>
      {
        JSON.parse(intents) && JSON.parse(intents).map((intent) => (
          <ListItem
            button
            key={intent.id}
            selected={intent.id === selectedUtterance}
            onClick={() => {onQuestionClick(intent.id)}}
            generated_at={props.generated_at}
          >
            <ListItemText primary={intent.name} />
          </ListItem>
          )
        )
      }
    </Container>
  );
}

export default Intents;
