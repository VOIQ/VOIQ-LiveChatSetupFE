import React, {useState} from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import '../Options.scss';
import './StandardFaqs.scss';

import Intents from "./Intents";
import Answers from "./Answers";
import IntentTypes from "./IntentTypes";

const StandardFaqs = (props) => {
  const [selectedUtterance, setSelectedUtterance] = useState(null);
  const [answers, setAnswers] = useState("[]");
  const [intents, setIntents] = useState("[]");

  return (
    <Grid container direction="column" spacing={2} className="option-container">
      <Grid item xs={11} className="standard-faq-container-item">
        <Grid container direction="row" className="standard-faq-container">
          <Grid item xs={6} className="standard-faq-questions">
            <Typography>Questions</Typography>
            <IntentTypes
              setAnswers={setAnswers}
              answers={answers}
              setIntents={setIntents}
              intents={intents}
              setSelectedUtterance={setSelectedUtterance}
              selectedUtterance={selectedUtterance}
              voicebotId={props.voicebotId}
              generatedAt={props.generatedAt}
            />
          </Grid>
          <Grid item xs={6} className="standard-faq-answers">
            <Typography>Answers</Typography>
            <Answers
              setAnswers={setAnswers}
              answers={answers}
              selectedUtterance={selectedUtterance}
              voicebotId={props.voicebotId}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StandardFaqs;
