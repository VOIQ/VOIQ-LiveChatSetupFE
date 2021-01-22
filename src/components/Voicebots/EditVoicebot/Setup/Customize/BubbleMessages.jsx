import React from "react";

import {MAX_LEN_KNOWN_VISITOR_MESSAGE} from "../../../../../constants";

import './Customize.scss';

import Grid from "@material-ui/core/Grid";
import InfoIcon from '@material-ui/icons/Info';
import TextField from "@material-ui/core/TextField";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";

import VoicebotsService from "../../../../../services/VoicebotsService";

const BubbleMessages = (props) => {
  const history = useHistory();

  const onKnownVisitorMessageBlur = (_event) => {
    VoicebotsService.update(
      props.voicebotId,
      { "known_visitor_message": props.knownVisitorMessage },
      history,
      (response) => {
      }
    );
  }

  const onKnownVisitorMessageChange = (event) => {
    props.setKnownVisitorMessage(event.target.value);
  }

  return (
    <Grid container direction="row">
      <Grid item xs={2}>
        <Typography>Known Visitor</Typography>
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
          id={"known-visitor-message"}
          onChange={onKnownVisitorMessageChange}
          onBlur={onKnownVisitorMessageBlur}
          value={props.knownVisitorMessage}
          className="customize-text-area"
          inputProps={{ maxLength: MAX_LEN_KNOWN_VISITOR_MESSAGE }}
          helperText={props.knownVisitorMessage.length + "/" + MAX_LEN_KNOWN_VISITOR_MESSAGE}
        />
      </Grid>
    </Grid>
  );
}

export default BubbleMessages;
