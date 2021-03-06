import React from 'react';

import ItemTable from "../../../../../Utils/ItemTable"
import {useHistory} from "react-router-dom";

import ItemRowHelper from "../../../../../../helpers/ItemRowHelper"

import IntentExamplesService from "../../../../../../services/IntentExamplesService";

import InfoIcon from '@material-ui/icons/Info';
import { Tooltip, Typography } from '@material-ui/core';

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
    let itemId = ItemRowHelper.getIdOfItem(event.target.id);
    IntentExamplesService.update(
      selectedUtterance,
      itemId,
      event.target.value,
      history,
      (response) => {
        let examples = JSON.parse(props.examples).map((example) => {
          if (example.id.toString() === itemId) {
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
      <div className="examples-header">
        <Typography>Examples</Typography>
        <Tooltip 
          placement="bottom-start" 
          title="You should have at least 10 examples to improve your bot’s understanding"
        >
          <InfoIcon color="action" />
        </Tooltip>
      </div>
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
