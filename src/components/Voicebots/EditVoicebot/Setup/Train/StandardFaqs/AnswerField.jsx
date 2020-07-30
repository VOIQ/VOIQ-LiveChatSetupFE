import React, {useState} from "react";

import TextField from "@material-ui/core/TextField";
import {useHistory} from "react-router-dom";

import IntentResponsesService from "../../../../../../services/IntentResponsesService";

const AnswerField = (props) => {
  const history = useHistory();
  const answer = props.answer;
  const [answerText, setAnswer] = useState(answer.response || "");

  const onAnswerBlur = (event) => {
    console.log(event.target);
    IntentResponsesService.update(
      event.target.id,
      event.target.value,
      history,
      (response) => {
        console.log(response);
      }
    );
  }

  const onAnswerChange = (event) => {
    setAnswer(event.target.value);
  }

  return (
    <TextField
      id={`${answer.id}`}
      value={answerText}
      onBlur={onAnswerBlur}
      onChange={onAnswerChange}
    />
  );
}

export default AnswerField;