import React, {useState} from "react";

import Grid from "@material-ui/core/Grid";

import '../Options.scss';
import './TrainingMaterial.scss';

import Answers from "./Answers";
import IntentTypes from "./IntentTypes";
import Examples from "./Examples";

const TrainingMaterial = (props) => {
  const [selectedUtterance, setSelectedUtterance] = useState(null);
  const [answers, setAnswers] = useState("[]");
  const [examples, setExamples] = useState("[]");

  return (
    <Grid container direction="column" spacing={2} className="option-container">
      <Grid item xs={11} className="training-material-container-item">
        <Grid container direction="row" className="training-material-container">
          <Grid item xs={6} className="training-material-intents">
            <IntentTypes
              setAnswers={setAnswers}
              answers={answers}
              setExamples={setExamples}
              examples={examples}
              setSelectedUtterance={setSelectedUtterance}
              selectedUtterance={selectedUtterance}
              voicebotId={props.voicebotId}
            />
          </Grid>
          {selectedUtterance && (
            <Grid item xs={6} className="training-material-answers">
              <Examples
                setExamples={setExamples}
                examples={examples}
                selectedUtterance={selectedUtterance}
                voicebotId={props.voicebotId}
              />
              <Answers
                setAnswers={setAnswers}
                answers={answers}
                selectedUtterance={selectedUtterance}
                voicebotId={props.voicebotId}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TrainingMaterial;
