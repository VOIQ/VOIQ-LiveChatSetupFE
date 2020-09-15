import React, {useRef, useState} from "react";

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from "@material-ui/core/IconButton";
import StopIcon from '@material-ui/icons/Stop';
import {Howl} from 'howler';

const ConversationPlayer = (props) => {
  const [playing, setPlaying] = useState(false);
  const answers = useRef(null);
  const question = useRef(null);

  const onPlayButtonClick = (event) => {
    if (playing) {
      answers.current.forEach((answer, _index) => {
        answer.stop();
      });
      question.current.stop();
      setPlaying(false);
    } else {
      if(!answers.current) {
        answers.current = []
        props.answersData.forEach((answer, _index) => {
          answers.current.push(
            new Howl({
              src: [answer.responseUrl],
              html5: true
            })
          )
        });
      }

      if(!question.current) {
        question.current = new Howl({
          src: [props.questionRecording],
          html5: true
        });
      }

      question.current.on('end', () => {
        answers.current.forEach((answer, _index) => {
          answer.play();
        });
      });
      question.current.play();

      let lastAnswer = answers.current.slice(-1).pop();
      lastAnswer.current.on('end', () => {
        setPlaying(false);
      });

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
