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
  const setAnswers = props.setAnswers;
  const selectedIntent = props.selectedIntent;

  const addAnswer = (_event) => {
    IntentResponsesService.create(
      selectedIntent,
      props.voicebotId,
      "",
      history,
      (response) => {
        console.log(response);
        setAnswers(JSON.stringify([
          ...JSON.parse(answers),
          response.intent_response
        ]));
      }
    );
  }

  const removeAnswer = (answerId) => {
    IntentResponsesService.delete(
      answerId,
      history,
      (response) => {
        let answersJson = JSON.parse(answers);
        answersJson = answersJson.filter((answer) => {
          return answer.id !== answerId;
        });
        setAnswers(JSON.stringify(answersJson));
      }
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableBody>
          {
            JSON.parse(answers) && JSON.parse(answers).map((answer, index) => (
              <TableRow key={answer.id}>
                <TableCell component="th" scope="row">
                  <AnswerRow
                    answer={answer}
                    answers={answers}
                    answerIndex={index}
                    setAnswers={setAnswers}
                    onRemoveAnswer={removeAnswer}
                  />
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
