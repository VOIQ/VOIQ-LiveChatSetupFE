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
  const setAnswersLength = props.setAnswersLength;
  const questions = props.questions;
  const setQuestionsLength = props.setQuestionsLength;
  const selectedIntent = props.selectedIntent;
  const setSelectedIntent = props.setSelectedIntent;
  const voicebotId = props.voicebotId;

  useEffect(() => {
    IntentsService.readAll(
      voicebotId,
      history,
      (response) => {
        questions.current = response;
        let intentId = questions.current[0].id;
        setQuestionsLength(questions.current.length);
        setSelectedIntent(intentId);

        IntentResponsesService.readAll(
          intentId,
          voicebotId,
          history,
          (intentResponse) => {
            answers.current = intentResponse;
            setAnswersLength(answers.current.length);
          }
        );
      }
    );
  }, [history, answers, questions, setAnswersLength, setQuestionsLength, setSelectedIntent, voicebotId]);

  useEffect(() => {
    IntentResponsesService.readAll(
      selectedIntent,
      voicebotId,
      history,
      (intentResponse) => {
        answers.current = intentResponse;

        // TODO: Review better approach, I can't directly use the arrays coming from the API as state because it will
        //    // always detect it as a change of state, to avoid using a data normalizer to be able to compare the
        //    // data inside the arrays I created references and manually updated the length state,
        //    // when I activate the bot the length is not changing but the data inside the arrays do.
        setAnswersLength(null);
        setAnswersLength(intentResponse.length);
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
        answers.current = intentResponse;
        setAnswersLength(answers.current.length);
        setSelectedIntent(intentId);
      }
    );
  }

  return (
    <List component="nav" aria-label="main mailbox folders">
      {
        questions.current && questions.current.map((question) => (
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
