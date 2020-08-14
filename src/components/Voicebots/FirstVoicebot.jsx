import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";

const FirstVoicebot = () => {
  const history = useHistory();

  const onCreateVoicebot = () => {
    history.push('/voicebots/create');
  }

  return (
    <Grid container spacing={3} direction="row" justify="center" className="voicebots-container">
      <Grid item xs={6} className="voicebots-first-item">
        <div className="welcome-title">
          Welcome! It looks like you haven’t created your first VoiceBot yet. Click on CREATE A BOT to get started!
        </div>
        <br/>
        <Button className="voiq-button-secondary" onClick={onCreateVoicebot}>CREATE MY FIRST VOICEBOT</Button>
      </Grid>
    </Grid>
  );
}

export default FirstVoicebot;