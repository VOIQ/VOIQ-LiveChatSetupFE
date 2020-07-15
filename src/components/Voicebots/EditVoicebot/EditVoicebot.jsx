import React, {useEffect, useState} from 'react';

import Grid from "@material-ui/core/Grid";
import VoicebotsService from "../../../services/VoicebotsService";
import {useHistory, useParams} from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const EditVoicebot = () => {
  let { id } = useParams();
  const history = useHistory();
  const [voicebotName, setVoicebotName] = useState("");

  useEffect(() => {
    VoicebotsService.read(
      id,
      history,
      (response) => {
        console.log("EditVoicebot Effect");
        console.log(response);
        setVoicebotName(response.name);
      }
    );
  }, [history, id]);

  const onVoicebotNameBlur = (event) => {
    console.log(event.target.value);
  }

  const onVoicebotNameChange = (event) => {
    setVoicebotName(event.target.value);
  }

  return (
    <Grid container spacing={1} direction="column" className="voicebots-container">
      <Grid item xs={1} className="create-voicebot-title">
        <TextField id="voicebot-name" value={voicebotName} onBlur={onVoicebotNameBlur} onChange={onVoicebotNameChange}/>
      </Grid>
    </Grid>
  );
}

export default EditVoicebot;