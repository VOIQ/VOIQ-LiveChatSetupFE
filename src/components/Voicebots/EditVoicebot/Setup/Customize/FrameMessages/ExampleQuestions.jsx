import React, {useEffect, useState} from 'react';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";

import ExampleQuestionService from "../../../../../../services/ExampleQuestionService";

import ItemTable from '../../../../../Utils/ItemTable';

const ExampleQuestions = (props) => {
  const voicebotId = props.voicebotId;
  const history = useHistory();
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questions, setExampleQuestions] = useState("[]");

  useEffect(() => {
    ExampleQuestionService.read(
      voicebotId,
      history,
      (response) => {
        setNumberOfQuestions(response.length);
        setExampleQuestions(JSON.stringify(response));
      }
    );
  }, [history, voicebotId]);

  const addQuestion = (_event) => {
    setNumberOfQuestions(numberOfQuestions + 1);
    ExampleQuestionService.create(
      props.voicebotId,
      "",
      history,
      (response) => {
        setExampleQuestions(JSON.stringify([
          ...JSON.parse(questions),
          response
        ]));
      }
    );
  }

  const removeQuestion = (questionId) => {
    setNumberOfQuestions(numberOfQuestions - 1);
    ExampleQuestionService.delete(
      questionId,
      voicebotId,
      history,
      (response) => {
        let questionsJson = JSON.parse(questions);
        questionsJson = questionsJson.filter((question) => {
          return question.id !== questionId;
        });
        setExampleQuestions(JSON.stringify(questionsJson));
      }
    );
  }

  const onQuestionBlur = (event) => {
    event.persist();
    ExampleQuestionService.update(
      event.target.id.split('-')[1],
      event.target.value,
      voicebotId,
      history
    );
  }

  return (
    <Grid container direction="row">
      <Grid item xs={3}>
        <Typography>Questions</Typography>
      </Grid>
      <Grid item xs={8}>
        <ItemTable
          attributeName='question'
          voicebotId={voicebotId}
          itemList={questions}
          setList={setExampleQuestions}
          onRemoveItem={removeQuestion}
          onItemBlur={onQuestionBlur}
          addItem={addQuestion}
          numberOfItems={numberOfQuestions}
          setNumberOfItems={setNumberOfQuestions}
          helperText={true}
          maxLength={60}
          limit={3}
        />
      </Grid>
    </Grid>
  );
}

export default ExampleQuestions;
