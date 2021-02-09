import React, {useState} from "react";

import Customize from "./Customize/Customize";
import Train from "./Train/Train";
import VoicebotResponsesService from '../../../../services/VoicebotActivationService';
import Install from "./Install/Install";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

const Setup = (props) => {
  const [generatedAt, setGeneratedAt] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showActivationAlert, setActivationAlert] = useState(false);
  const history = useHistory();

  const onActivate = () => {
    VoicebotResponsesService.activate(
      props.voicebotId,
      "domain",
      history,
      (response) => {
        if (response.status === 200) {
          VoicebotResponsesService.generateResponses(
            props.voicebotId,
            history,
            (response) => {
              setButtonDisabled(true);
              updateGenerateProgress();
            }
          );
          VoicebotResponsesService.generateActions(
            props.voicebotId,
            history,
            (response) => {
              setButtonDisabled(true);
              updateGenerateProgress();
            }
          );
        } else if (response.status === 226) {
          console.log("Undergoing process");
          setActivationAlert(true);
        }
      }
    );
  }

  const updateGenerateProgress = () => {
    VoicebotResponsesService.progress(
      props.voicebotId,
      history,
      (response) => {
        if (response.percentage === 100) {
          setGeneratedAt(Date.now().toString());
          setButtonDisabled(false);
          console.log("Process finished");
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
          <Customize 
            voicebotId={props.voicebotId}
            setKnownVisitorMessage={props.setKnownVisitorMessage}
            knownVisitorMessage={props.knownVisitorMessage}
            setInstructions={props.setInstructions}
            instructions={props.instructions}
            setGreetFirstTimeUser={props.setGreetFirstTimeUser}
            greetFirstTimeUser={props.greetFirstTimeUser}
            setGreetRecurrentUser={props.setGreetRecurrentUser}
            greetRecurrentUser={props.greetRecurrentUser}
          />
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
          <Install voicebotId={props.voicebotId} voicebotAuthorizedDomain={props.voicebotAuthorizedDomain}/>
        </AccordionDetails>
      </Accordion>
      <Box display="flex" justifyContent="flex-end">
        <Button disabled={buttonDisabled} className="voiq-button-primary activate-button" onClick={onActivate}>
          Activate
        </Button>
      </Box>
      { showActivationAlert && (<Alert className="voiq-info-alert" onClose={() => {setActivationAlert(false)}} severity="info">The activation process is already undergoing</Alert>)}
    </div>
  );
}

export default Setup;
