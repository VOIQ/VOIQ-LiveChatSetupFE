import React, {useEffect, useRef} from 'react';

import { CircularProgress, Grid } from "@material-ui/core";
import {useHistory} from "react-router-dom";

import FirstVoicebot from './FirstVoicebot';
import VoicebotsService from '../../services/VoicebotsService';
import VoicebotsList from "./VoicebotsList";

import './Voicebots.scss';

const Voicebots = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [hasVoicebots, setHasVoicebots] = React.useState(false);
  const voicebots = useRef(null);

  useEffect(() => {
    VoicebotsService.readAll(
      history,
      (response) => {
        setLoading(false);
        voicebots.current = response;
        setHasVoicebots(response.length > 0);
      }
    );
  }, [history]);

  if (loading) {
    return (
      <Grid container spacing={3} direction="row" alignItems="center" justify="center" className="voicebots-container">
        <CircularProgress className="voicebot-progress" />
      </Grid>
    );
  } else if (hasVoicebots) {
    return (
      <VoicebotsList hasVoicebots={hasVoicebots} voicebots={voicebots.current}/>
    );
  } else {
    return (
      <FirstVoicebot/>
    );
  }
}

export default Voicebots;
