import React from 'react';

import ItemTable from "../../../../../Utils/ItemTable"
import {useHistory} from "react-router-dom";

import IntentExamplesService from "../../../../../../services/IntentExamplesService";
import { Typography } from '@material-ui/core';

const Examples = (props) => {
  const history = useHistory();
  const selectedUtterance = props.selectedUtterance;

  const addExample = (_event) => {
    IntentExamplesService.create(
      selectedUtterance,
      "",
      history,
      (response) => {
        props.setExamples(JSON.stringify([
          ...JSON.parse(props.examples),
          response
        ]));
      }
    );
  }

  const removeExample = (exampleId) => {
    IntentExamplesService.delete(
      selectedUtterance,
      exampleId,
      history,
      (response) => {
        let examplesJson = JSON.parse(props.examples);
        examplesJson = examplesJson.filter((example) => {
          return example.id !== exampleId;
        });
        props.setExamples(JSON.stringify(examplesJson));
      }
    );
  }

  const onExampleBlur = (event) => {
    event.persist();

    IntentExamplesService.update(
      selectedUtterance,
      event.target.id.split('-')[1],
      event.target.value,
      history,
      (response) => {
        let examples = JSON.parse(props.examples).map((example) => {
          if (example.id.toString() === event.target.id.split('-')[1]) {
            example.example = event.target.value;
            if (response.status === 422) {
              example.error_message = response.data.message;
            }
            return example;
          } else {
            return example;
          }
        });
        props.setExamples(JSON.stringify(examples));
      }
    );
  }

  return (
    <div className="examples-container">
      <Typography>Examples</Typography>
      <div className="examples">
        <ItemTable
          attributeName='example'
          voicebotId={props.voicebotId}
          itemList={props.examples}
          setList={props.setExamples}
          onRemoveItem={removeExample}
          onItemBlur={onExampleBlur}
          addItem={addExample}
          multiline={true}
          rowsMax={4}
        />
      </div>
    </div>
  );
}

export default Examples;
