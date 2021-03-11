import React from "react";

import Grid from "@material-ui/core/Grid";

import './Train.scss';
import TrainingMaterial from "./TrainingMaterial/TrainingMaterial";

const Train = (props) => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <TrainingMaterial voicebotId={props.voicebotId} generatedAt={props.generatedAt}/>
      </Grid>
    </Grid>
  );
}

export default Train;