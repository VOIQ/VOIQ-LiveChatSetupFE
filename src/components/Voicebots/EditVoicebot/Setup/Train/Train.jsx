import React from "react";

import Grid from "@material-ui/core/Grid";
import StandardFaqs from "./StandardFaqs/StandardFaqs";

const Train = (props) => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <StandardFaqs voicebotId={props.voicebotId} generatedAt={props.generatedAt}/>
      </Grid>
    </Grid>
  );
}

export default Train;