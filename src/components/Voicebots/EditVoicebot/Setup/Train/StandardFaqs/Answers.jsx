import React from "react";

import IntentResponsesService from "../../../../../../services/IntentResponsesService";
import AnswerRow from "./AnswerRow";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import {useHistory} from "react-router-dom";

const Answers = (props) => {
  const history = useHistory();
  const answers = props.answers;
  const answersLength = props.answers_length;
  const setAnswersLength = props.setAnswersLength;
  const selectedIntent = props.selectedIntent;

  const addAnswer = (_event) => {
    IntentResponsesService.create(
      selectedIntent,
      props.voicebotId,
      "",
      history,
      (response) => {
        answers.current = [...answers.current, response.intent_response];
        setAnswersLength(answers.current.length);
      }
    );
  }

  const removeAnswer = (answerId) => {
    IntentResponsesService.delete(
      answerId,
      history,
      (response) => {
        answers.current = answers.current.filter((answer) => {
          return answer.id !== answerId;
        });
        setAnswersLength(answers.current.length);
      }
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableBody answers_length={answersLength}>
          {
            answers.current && answers.current.map((answer, index) => (
              <TableRow key={answer.id}>
                <TableCell component="th" scope="row">
                  <AnswerRow answers={answers} answersIndex={index} onRemoveAnswer={removeAnswer} generatedAt={props.generatedAt}/>
                </TableCell>
              </TableRow>
            ))
          }
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
