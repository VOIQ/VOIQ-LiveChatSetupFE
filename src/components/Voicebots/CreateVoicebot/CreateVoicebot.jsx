import React from 'react';

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import Helpers from "../../../helpers/Utils";
import { Box, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import VoicebotsService from "../../../services/VoicebotsService";

import './CreateVoicebot.scss';
import '../Voicebots.scss';

const CreateVoicebot = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (values) => {
    try {
      VoicebotsService.create(
        values['voicebot_name'],
        history,
        (response) => {
          if (response.status && response.status === 'OK') {
            history.push('/voicebots');
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Grid container wrap="nowrap" spacing={1} direction="column" className="voicebots-container">
      <Grid item xs={1} className="voiq-title">
        Create Voicebot
      </Grid>
      <Grid item xs={11} className="create-voicebot-form">
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="voiq-field" textAlign="center">
              <TextField
                error={!Helpers.emptyObject(errors.email)}
                helperText={errors.email && errors.email.message ? errors.email.message : ''}
                id="voicebot_name"
                name="voicebot_name"
                label="Voicebot Name"
                type="voicebot_name"
                placeholder="Enter the voicebot name"
                autoFocus={true}
                inputRef={register}
              />
            </Box>
            <Box textAlign="right">
              <Button type="submit" className="voiq-button-secondary">Create</Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CreateVoicebot;