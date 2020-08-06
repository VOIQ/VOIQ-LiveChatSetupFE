import React, {useState} from "react";

import IntentResponsesService from "../../../../../../services/IntentResponsesService";
import './AnswerRow.scss';

import TextField from "@material-ui/core/TextField";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDoneIcon from '@material-ui/icons/CloudDone';

const AnswerRow = (props) => {
  const history = useHistory();
  const [answerText, setAnswerText] = useState(
    props.answer.response || ""
  );
  const [updated, setUpdated] = useState(false);

  const onAnswerBlur = (event) => {
    event.persist();

    IntentResponsesService.update(
      event.target.id,
      event.target.value,
      history,
      (response) => {
        // TODO: Handle response
        console.log(response);
        let answers = JSON.parse(props.answers).map((answer) => {
          if (answer.id.toString() === event.target.id) {
            answer.response = event.target.value;
            answer.audio_id = null;
            console.log(answer);
            return answer;
          } else {
            return answer;
          }
        });
        props.setAnswers(JSON.stringify(answers));
        setUpdated(true);
      }
    );
  }

  const onAnswerChange = (event) => {
    setAnswerText(event.target.value);
  }

  return (
    <Grid container direction="row">
      <Grid item xs={10}>
        <TextField
          multiline
          rowsMax={4}
          id={`${props.answer.id}`}
          value={answerText}
          onBlur={onAnswerBlur}
          onChange={onAnswerChange}
          className="answer-text-field"
        />
      </Grid>
      <Grid item xs={1} audio_id={props.answer.audio_id} generated_at={props.generatedAt}>
        { JSON.parse(props.answers)[props.answerIndex].audio_id && !updated && <CloudDoneIcon/> }
      </Grid>
      <Grid item xs={1}>
        <IconButton aria-label="delete" className="delete-answer" onClick={() => {props.onRemoveAnswer(props.answer.id)}}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default AnswerRow;