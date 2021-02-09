import React from "react";

import {MAX_LEN_GREETING_MESSAGES} from "../../../../../constants";

import './Customize.scss';

import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import TextField from "@material-ui/core/TextField";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";

import VoicebotsService from "../../../../../services/VoicebotsService";

const GreetingMessages = (props) => {
  const history = useHistory();

  const onGreetFirstTimeUserBlur = (_event) => {
    VoicebotsService.update(
      props.voicebotId,
      { "greet_first_time_user": props.greetFirstTimeUser },
      history
    );
  }

  const onGreetRecurrentUserBlur = (_event) => {
    VoicebotsService.update(
      props.voicebotId,
      { "greet_recurrent_user": props.greetRecurrentUser },
      history
    );
  }

  const onGreetFirstTimeUserChange = (event) => {
    props.setGreetFirstTimeUser(event.target.value);
  }
  
  const onGreetRecurrentUserChange = (event) => {
    props.setGreetRecurrentUser(event.target.value);
  }

  function greetingMessageTextField(name, value, onChange, onBlur) {
    let id = name.replaceAll(" ","-").toLowerCase()
    return (
      <Grid container direction="row">  
        <Grid item xs={2}>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Tooltip 
            placement="bottom-start" 
            title="You can use ||FirstName|| tag to customize the message with the visitor’s name"
          >
            <InfoIcon color="action" />
          </Tooltip>
        </Grid>
        <Grid item xs={8}>
          <TextField
            multiline
            className="customize-text-area"
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputProps={{ maxLength: MAX_LEN_GREETING_MESSAGES }}
            helperText={value.length + "/" + MAX_LEN_GREETING_MESSAGES}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="customize-content"
            id="customize-header"
          >
            <Typography>Greeting Messages</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column">  
              {greetingMessageTextField("First Time User", props.greetFirstTimeUser, onGreetFirstTimeUserChange, onGreetFirstTimeUserBlur)}
              {greetingMessageTextField("Recurrent User", props.greetRecurrentUser, onGreetRecurrentUserChange, onGreetRecurrentUserBlur)}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

export default GreetingMessages;
