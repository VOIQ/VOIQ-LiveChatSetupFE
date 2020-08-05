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
  const [answerText, setAnswer] = useState(props.answers.current[props.answersIndex].response || "");
  const [updated, setUpdated] = useState(false);

  const onAnswerBlur = (event) => {
    IntentResponsesService.update(
      event.target.id,
      event.target.value,
      history,
      (response) => {
        setUpdated(true)
      }
    );
  }

  const onAnswerChange = (event) => {
    setAnswer(event.target.value);
  }

  return (
    <Grid container direction="row">
      <Grid item xs={10}>
        <TextField
          multiline
          rowsMax={4}
          id={`${props.answers.current[props.answersIndex].id}`}
          value={answerText}
          onBlur={onAnswerBlur}
          onChange={onAnswerChange}
          className="answer-text-field"
        />
      </Grid>
      <Grid item xs={1} audio_id={props.answers.current[props.answersIndex].audio_id} updated={updated} generated_at={props.generatedAt}>
        { props.answers.current[props.answersIndex].audio_id && !updated && <CloudDoneIcon/> }
      </Grid>
      <Grid item xs={1}>
        <IconButton aria-label="delete" className="delete-answer" onClick={() => {props.onRemoveAnswer(props.answers.current[props.answersIndex].id)}}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default AnswerRow;