import React, {useEffect, useState} from "react";

import './Customize.scss';

import VoicebotImagesService from '../../../../services/VoicebotImagesService';

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from "react-router-dom";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const Customize = (props) => {
  const history = useHistory();
  const voicebotId = props.voicebot_id;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    VoicebotImagesService.read(
      voicebotId,
      history,
      (response) => {
        if (response.image_url) {
          setImageUrl(response.image_url);
        }
      }
    );
  }, [history, voicebotId]);

  const onFileChange = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0]
    console.log(file);
    reader.readAsDataURL(file);
    let readerResult = null;
    reader.addEventListener("load", function () {
      readerResult = reader.result;

      VoicebotImagesService.create(
        readerResult,
        file.type,
        voicebotId,
        history,
        (response) => {
          setImageUrl(response.image_url);
        }
      );
    }, false);
  }

  const image = () => {
    if (imageUrl) {
      return (
        <Avatar
          alt="Voicebot Avatar"
          src={imageUrl}
          className="voicebot-avatar"
        />
      );
    } else {
      return (
        <PersonOutlineIcon/>
      );
    }
  }

  return (
    <Grid container direction="column">
      <Grid item xs={4} className="customize-avatar-item">
        <Grid container direction="row">
          <Grid item xs={10}>
            <Typography>Upload photo</Typography>
            <Typography>Customize your voicebot with a photo.</Typography>
          </Grid>
          <Grid item xs={2}>
            <input accept="image/*" id="icon-button-file" type="file" style={{display: 'none'}} onChange={onFileChange}/>
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                {image()}
              </IconButton>
            </label>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        Select a voice
        <Divider/>
        Voices table
      </Grid>
    </Grid>
  );
}

export default Customize;