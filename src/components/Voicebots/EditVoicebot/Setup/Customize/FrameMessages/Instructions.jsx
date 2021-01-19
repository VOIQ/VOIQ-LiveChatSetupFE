import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";

import VoicebotsService from "../../../../../../services/VoicebotsService";

const Instructions = (props) => {
  const history = useHistory();
  const maxLength = 100;

  const onInstructionsBlur = (_event) => {
    VoicebotsService.update(
      props.voicebotId,
      { "instructions": props.instructions },
      history,
      (response) => {
      }
    );
  }
  
  const onInstructionsChange = (event) => {
    props.setInstructions(event.target.value);
  }

  return (
    <Grid container direction="row">
      <Grid item xs={3}>
        <Typography>Instructions</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id={"instructions"}
          onChange={onInstructionsChange}
          onBlur={onInstructionsBlur}
          value={props.instructions}
          className="customize-text-area"
          inputProps={{ maxLength: maxLength }}
          helperText={props.instructions.length + "/" + maxLength}
        />
      </Grid>
    </Grid>
  );
}

export default Instructions;
