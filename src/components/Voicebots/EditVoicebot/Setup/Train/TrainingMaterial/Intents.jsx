import React, {useEffect, useState} from "react";

import IntentsService from "../../../../../../services/IntentsService";
import UtteranceResponsesService from "../../../../../../services/UtteranceResponsesService";
import IntentExamplesService from "../../../../../../services/IntentExamplesService";

import AddIntent from "../../../../../Popups/AddIntent";

import {useHistory} from "react-router-dom";

import { Card, CardContent, Grid, ListItem, ListItemText, Typography } from "@material-ui/core";

const Intents = (props) => {
  const history = useHistory();
  const [intents, setIntents] = useState("[]");

  useEffect(() => {
    IntentsService.read(
      props.intentTypeId,
      props.voicebotId,
      history,
      (response) => {
        setIntents(JSON.stringify(response));
      }
    );
  }, [history, props.intentTypeId, props.setIntents, props.voicebotId]);

  const updateIntentsAndAnswers = (utteranceId) => {
    UtteranceResponsesService.readAll(
      props.voicebotId,
      utteranceId,
      history,
      (utterancesResponse) => {
        props.setSelectedUtterance(utteranceId);
        utterancesResponse.forEach(answer => 
          answer.audio_id ? answer.should_show_optional_icon = true : answer.should_show_optional_icon = false
        );
        props.setAnswers(JSON.stringify(utterancesResponse));
      }
    );
    IntentExamplesService.readAll(
      utteranceId,
      history,
      (utterancesResponse) => {
        props.setSelectedUtterance(utteranceId);
        props.setExamples(JSON.stringify(utterancesResponse));
      }
    );
  }

  return (
    <Card>
      <CardContent>
        <Grid container direction="row">
          <Grid item xs={11}>
            <Typography gutterBottom variant="h6" component="h4">
              {props.intentType.name}
            </Typography>
          </Grid>
          { props.canCreate &&
            <Grid item xs={1}>
              <AddIntent
                intents={intents}
                setIntents={setIntents}
                setSelectedUtterance={props.setSelectedUtterance}
                voicebotId={props.voicebotId}
                intentTypeId={props.intentType.id}
                codePrefix={props.intentType.name.toLowerCase()}
                updateIntentsAndAnswers={updateIntentsAndAnswers}
              />
            </Grid>
          }
        </Grid>
        <div className="intents">
          {
            JSON.parse(intents) && JSON.parse(intents).map((intent) => (
              <ListItem
                button
                key={intent.id}
                selected={intent.id === props.selectedUtterance}
                onClick={() => {updateIntentsAndAnswers(intent.id)}}
              >
                <ListItemText primary={intent.name} />
              </ListItem>
              )
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}

export default Intents;
