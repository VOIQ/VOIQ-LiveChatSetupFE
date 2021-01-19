import React, {useState, useEffect} from "react";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {useHistory} from "react-router-dom";

import VoicebotImagesService from '../../../../../services/VoicebotImagesService';

const VoicebotImage = (props) => {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    VoicebotImagesService.read(
      props.voicebotId,
      history,
      (response) => {
        if (response.image_url) {
          setImageUrl(response.image_url);
        }
      }
    );
  }, [history, props.voicebotId]);

  const onFileChange = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0]
    reader.readAsDataURL(file);
    let readerResult = null;
    reader.addEventListener("load", function () {
      readerResult = reader.result;

      VoicebotImagesService.create(
        readerResult,
        file.type,
        props.voicebotId,
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
    <Grid item xs={2}>
      <input accept="image/*" id="icon-button-file" type="file" style={{display: 'none'}} onChange={onFileChange}/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          {image()}
        </IconButton>
      </label>
    </Grid>
  );
}

export default VoicebotImage;
