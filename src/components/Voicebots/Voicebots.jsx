import React, {useEffect, useState} from 'react';

import { CircularProgress, Grid } from "@material-ui/core";
import {useHistory} from "react-router-dom";

import FirstVoicebot from './FirstVoicebot';
import VoicebotsService from '../../services/VoicebotsService';
import VoicebotsList from "./VoicebotsList";

import './Voicebots.scss';

const Voicebots = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [voicebots, setVoicebots] = useState("[]");

  useEffect(() => {
    VoicebotsService.readAll(
      history,
      (response) => {
        setLoading(false);
        setVoicebots(JSON.stringify(response));
      }
    );
  }, [history]);

  let voicebotsJson = JSON.parse(voicebots);
  if (loading) {
    return (
      <Grid container spacing={3} direction="row" alignItems="center" justify="center" className="voicebots-container">
        <CircularProgress className="voicebot-progress" />
      </Grid>
    );
  } else if (voicebotsJson.length) {
    return (
      <VoicebotsList voicebots={voicebots} setVoicebots={setVoicebots}/>
    );
  } else {
    return (
      <FirstVoicebot/>
    );
  }
}

export default Voicebots;
