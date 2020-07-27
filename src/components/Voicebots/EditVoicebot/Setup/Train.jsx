import React from "react";

import Grid from "@material-ui/core/Grid";
import StandardFaqs from "./TrainOptions/StandardFaqs/StandardFaqs";

const Train = () => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <StandardFaqs/>
      </Grid>
    </Grid>
  );
}

export default Train;