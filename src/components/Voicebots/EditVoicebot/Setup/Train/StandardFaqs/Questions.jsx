import React, {useEffect} from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import {CircularProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";

import IntentsService from "../../../../../../services/IntentsService";
import IntentResponsesService from "../../../../../../services/IntentResponsesService";

const Questions = (props) => {
  const history = useHistory();
  const questions = props.questions;
  const selectedIntent = props.selected_intent;
  const setSelectedIntent = props.set_selected_intent;
  const answers = props.answers;
  const setAnswersCount = props.set_answers_count;
  const voicebotId = props.voicebot_id;

  useEffect(() => {
    IntentsService.readAll(
      voicebotId,
      history,
      (response) => {
        questions.current = response;
        let intentId = questions.current[0].id
        setSelectedIntent(intentId);

        IntentResponsesService.readAll(
          intentId,
          voicebotId,
          history,
          (intentResponse) => {
            console.log("Intent Response");
            console.log(intentResponse);
            answers.current = intentResponse;
            setAnswersCount(intentResponse.length);
          }
        );
      }
    );
  }, [history, questions, answers, setAnswersCount, setSelectedIntent, voicebotId]);

  const onQuestionClick = (intent) => {
    console.log(intent);
    answers.current = null;
    setSelectedIntent(null);
    IntentResponsesService.readAll(
      intent,
      props.voicebot_id,
      history,
      (intentResponse) => {
        answers.current = intentResponse;
        setSelectedIntent(intent);
      }
    );
  }

  if (questions.current) {
    let questionsList = questions.current.map((question) => {
      return (
        <ListItem
          button
          key={`${question.id}`}
          selected={question.id === selectedIntent}
          onClick={() => {onQuestionClick(question.id)}}
        >
          <ListItemText primary={question.name} />
        </ListItem>
      );
    });
    return (
      <List component="nav" aria-label="main mailbox folders">
        {questionsList}
      </List>
    );
  } else {
    return (
      <Grid container direction="row" alignItems="center" justify="center" className="voicebots-container">
        <CircularProgress className="voicebot-progress" />
      </Grid>
    );
  }
}

export default Questions;
