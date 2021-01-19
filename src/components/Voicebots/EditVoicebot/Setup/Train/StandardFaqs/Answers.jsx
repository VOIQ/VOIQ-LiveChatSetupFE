import React from 'react';

import CloudDoneIcon from '@material-ui/icons/CloudDone';
import ItemTable from "../../../../../Utils/ItemTable"
import {useHistory} from "react-router-dom";

import UtteranceResponsesService from "../../../../../../services/UtteranceResponsesService";

const Answers = (props) => {
  const history = useHistory();
  const selectedUtterance = props.selectedUtterance;

  const addAnswer = (_event) => {
    UtteranceResponsesService.create(
      selectedUtterance,
      props.voicebotId,
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

    UtteranceResponsesService.update(
      event.target.id.split('-')[1],
      event.target.value,
      history,
      (response) => {
        let answers = JSON.parse(props.answers).map((answer) => {
          if (answer.id.toString() === event.target.id) {
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
  );
}

export default Answers;
