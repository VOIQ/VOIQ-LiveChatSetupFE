import React, {useEffect} from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {useHistory} from "react-router-dom";

import IntentsService from "../../../../../../services/IntentsService";
import IntentResponsesService from "../../../../../../services/IntentResponsesService";

const Questions = (props) => {
  const history = useHistory();
  const answers = props.answers;
  const setAnswers = props.setAnswers;
  const questions = props.questions;
  const setQuestions = props.setQuestions;
  const selectedIntent = props.selectedIntent;
  const setSelectedIntent = props.setSelectedIntent;
  const voicebotId = props.voicebotId;

  useEffect(() => {
    IntentsService.readAll(
      voicebotId,
      history,
      (response) => {
        setQuestions(JSON.stringify(response));

        if (selectedIntent === null) {
          setSelectedIntent(response[0].id);
        }

        if (response.length > 0) {
          IntentResponsesService.readAll(
            selectedIntent,
            voicebotId,
            history,
            (intentResponse) => {
              setAnswers(JSON.stringify(intentResponse));
            }
          );
        }
      }
    );
  }, [history, answers, questions, setAnswers, setQuestions, setSelectedIntent, voicebotId, selectedIntent]);

  useEffect(() => {
    IntentResponsesService.readAll(
      selectedIntent,
      voicebotId,
      history,
      (intentResponse) => {
        setAnswers(JSON.stringify(intentResponse));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.generatedAt]);

  const onQuestionClick = (intentId) => {
    IntentResponsesService.readAll(
      intentId,
      props.voicebotId,
      history,
      (intentResponse) => {
        setSelectedIntent(intentId);
        setAnswers(JSON.stringify(intentResponse));
      }
    );
  }

  return (
    <List component="nav" aria-label="main mailbox folders">
      {
        JSON.parse(questions) && JSON.parse(questions).map((question) => (
            <ListItem
              button
              key={`${question.id}`}
              selected={question.id === selectedIntent}
              onClick={() => {onQuestionClick(question.id)}}
              generated_at={props.generated_at}
            >
              <ListItemText primary={question.name} />
            </ListItem>
          )
        )
      }
    </List>
  );
}

export default Questions;
