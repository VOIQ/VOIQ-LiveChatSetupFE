import React from "react";

import './Customize.scss';

import BubbleMessages from "./BubbleMessages";
import Instructions from "./FrameMessages/Instructions";
import VoicebotImage from "./VoicebotImage";
import ExampleQuestions from "./FrameMessages/ExampleQuestions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Customize = (props) => {

  return (
    <Grid container direction="column">
      <Grid item xs={12} className="customize-item">
        <Grid container direction="row">
          <Grid item xs={10}>
            <Typography>Upload photo</Typography>
            <Typography>Customize your voicebot with a photo.</Typography>
          </Grid>
          <VoicebotImage
            voicebotId={props.voicebotId}
          />
          <Typography>Bubble Messages</Typography>
          <BubbleMessages
            voicebotId={props.voicebotId}
            setKnownVisitorMessage={props.setKnownVisitorMessage} 
            knownVisitorMessage={props.knownVisitorMessage} 
          />
          <Typography>Frame Messages</Typography>
          <Grid container direction="column">
            <Instructions
              voicebotId={props.voicebotId}
              setInstructions={props.setInstructions}
              instructions={props.instructions} 
            />
            <ExampleQuestions
              voicebotId={props.voicebotId}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Customize;
