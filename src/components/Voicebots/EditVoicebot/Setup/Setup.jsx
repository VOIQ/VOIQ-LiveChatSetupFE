import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import Customize from "./Customize/Customize";
import Train from "./Train/Train";

const Setup = (props) => {
  return (
    <div className="voicebot-setup">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="customize-content"
          id="customize-header"
        >
          <Typography>Customize</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Customize voicebot_id={props.voicebot_id}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="train-content"
          id="train-header"
        >
          <Typography>Train</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Train voicebot_id={props.voicebot_id}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="train-content"
          id="train-header"
        >
          <Typography>Install</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Install
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Setup;
