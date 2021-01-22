import React from 'react';

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BasicInfo from './BasicInfo';

import './MyProfile.scss';

const MyProfile = () => {

  return (
    <div className="voiq-my-profile">
      <Grid container direction="column" className="voicebots-container" wrap="nowrap">
        <Grid item xs={1} className="voiq-title">
          My Profile
        </Grid>
        <Grid item xs={3} className="voiq-my-profile">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="customize-content"
              id="customize-header"
            >
              <Typography>Basic Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <BasicInfo />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyProfile;
