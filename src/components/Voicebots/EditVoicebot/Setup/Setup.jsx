import React, {useState} from "react";

import Customize from "./Customize/Customize";
import Train from "./Train/Train";
import VoicebotResponsesService from '../../../../services/VoicebotResponsesService';
import Install from "./Install/Install";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Setup = (props) => {
  const [generatedAt, setGeneratedAt] = useState(null);
  const history = useHistory();

  const onActivate = () => {
    VoicebotResponsesService.generateAll(
      props.voicebotId,
      history,
      (response) => {
        updateGenerateProgress();
      }
    );
  }

  const updateGenerateProgress = () => {
    VoicebotResponsesService.progress(
      props.voicebotId,
      history,
      (response) => {
        console.log(response);
        if (response.percentage === 100) {
          setGeneratedAt(Date.now().toString());
        } else {
          setTimeout(function(){
            updateGenerateProgress();
          }, 2000);
        }
      }
    );
  }

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
          <Customize voicebotId={props.voicebotId}/>
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
          <Train voicebotId={props.voicebotId} generatedAt={generatedAt}/>
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
          <Install voicebotId={props.voicebotId}/>
        </AccordionDetails>
      </Accordion>
      <Box display="flex" justifyContent="flex-end">
        <Button className="voiq-button-primary activate-button" onClick={onActivate}>
          Activate
        </Button>
      </Box>
    </div>
  );
}

export default Setup;
