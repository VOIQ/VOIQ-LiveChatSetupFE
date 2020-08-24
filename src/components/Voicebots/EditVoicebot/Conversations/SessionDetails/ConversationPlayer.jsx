import React, {useRef, useState} from "react";

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from "@material-ui/core/IconButton";
import StopIcon from '@material-ui/icons/Stop';
import {Howl} from 'howler';

const ConversationPlayer = (props) => {
  const [playing, setPlaying] = useState(false);
  const answer = useRef(null);
  const question = useRef(null);

  const onPlayButtonClick = (event) => {
    console.log(props.id)
    console.log(props.questionRecording)
    console.log(props.answerRecording)
    if (playing) {
      answer.current.stop();
      question.current.stop();
      setPlaying(false);
    } else {
      if(!answer.current) {
        answer.current = new Howl({
          src: [props.answerRecording],
          html5: true
        });
      }

      if(!question.current) {
        question.current = new Howl({
          src: [props.questionRecording],
          html5: true
        });
      }

      question.current.on('end', () => {
        answer.play();
      });
      question.current.play();
      setPlaying(true);
    }
  }

  return (
    <IconButton id={props.id} onClick={onPlayButtonClick} color="primary">
      { playing ? <StopIcon/> : <PlayCircleFilledIcon /> }
    </IconButton>
  );
}

export default ConversationPlayer;
