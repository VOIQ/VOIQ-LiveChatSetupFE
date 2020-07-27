import React from "react";

import IntentResponsesService from "../../../../../../services/IntentResponsesService";
import AnswerField from "./AnswerField";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

const Answers = (props) => {
  const history = useHistory();
  const answers = props.answers;
  const answersCount = props.answers_count;
  const setAnswersCount = props.set_answers_count;
  const selectedIntent = props.selected_intent;
  let answersList = []

  const addAnswer = (_event) => {
    IntentResponsesService.create(
      selectedIntent,
      "",
      history,
      (response) => {
        answers.current.push(response.intent_response);
        setAnswersCount(answers.current.length);
      }
    );
  }

  const removeAnswer = (answerId) => {
    IntentResponsesService.delete(
      answerId,
      history,
      (response) => {
        console.log(response);
        answers.current = answers.current.filter((answer) => {
          return answer.id !== answerId;
        });
        setAnswersCount(answersCount - 1);
      }
    );
  }

  if (answers.current) {
    answersList = answers.current.map((answer) => {
      return (
        <TableRow key={answer.id}>
          <TableCell component="th" scope="row">
            <Grid container direction="row">
              <Grid item xs={11}>
                <AnswerField answer={answer}/>
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="delete" className="delete-answer" onClick={() => {removeAnswer(answer.id)}}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      )
    });
  }

  return (
    <TableContainer component={Paper} answers_count={answersCount}>
      <Table size="small" aria-label="simple table">
        <TableBody>
          {answersList}
        </TableBody>
      </Table>
      <ListItem
        button
        alignItems="center"
        className="add-answer"
        onClick={addAnswer}
      >
        <AddIcon/>
      </ListItem>
    </TableContainer>
  );
}

export default Answers;
