import React from 'react';

import CloudDoneIcon from '@material-ui/icons/CloudDone';
import ItemTable from "../../../../../Utils/ItemTable"
import {useHistory} from "react-router-dom";

import ItemRowHelper from "../../../../../../helpers/ItemRowHelper"

import UtteranceResponsesService from "../../../../../../services/UtteranceResponsesService";
import { Typography } from '@material-ui/core';

const Answers = (props) => {
  const history = useHistory();
  const selectedUtterance = props.selectedUtterance;

  const addAnswer = (_event) => {
    UtteranceResponsesService.create(
      props.voicebotId,
      selectedUtterance,
      "",
      history,
      (response) => {
        response.should_show_optional_icon = false;
        props.setAnswers(JSON.stringify([
          ...JSON.parse(props.answers),
          response
        ]));
      }
    );
  }

  const removeAnswer = (answerId) => {
    UtteranceResponsesService.delete(
      props.voicebotId,
      answerId,
      history,
      (response) => {
        let answersJson = JSON.parse(props.answers);
        answersJson = answersJson.filter((answer) => {
          return answer.id !== answerId;
        });
        props.setAnswers(JSON.stringify(answersJson));
      }
    );
  }

  const onAnswerBlur = (event) => {
    event.persist();
    let itemId = ItemRowHelper.getIdOfItem(event.target.id);
    UtteranceResponsesService.update(
      props.voicebotId,
      itemId,
      event.target.value,
      history,
      (response) => {
        let answers = JSON.parse(props.answers).map((answer) => {
          if (answer.id.toString() === itemId) {
            answer.response = event.target.value;
            answer.audio_id = null;
            return answer;
          } else {
            return answer;
          }
        });
        props.setAnswers(JSON.stringify(answers));
      }
    );
  }

  function cloudIcon() {
    return (
      <CloudDoneIcon />
    );
  }

  return (
    <div className="answers-container">
      <Typography>Answers</Typography>
      <div className="answers">
        <ItemTable
          attributeName='response'
          voicebotId={props.voicebotId}
          itemList={props.answers}
          setList={props.setAnswers}
          onRemoveItem={removeAnswer}
          onItemBlur={onAnswerBlur}
          addItem={addAnswer}
          multiline={true}
          rowsMax={4}
          optionalIcon={cloudIcon}
        />
      </div>
  </div>
  );
}

export default Answers;
