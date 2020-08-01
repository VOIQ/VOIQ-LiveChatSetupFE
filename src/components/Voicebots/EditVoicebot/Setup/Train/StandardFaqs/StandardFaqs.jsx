import React, {useRef, useState} from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import '../Options.scss';
import './StandardFaqs.scss';

import Questions from "./Questions";
import Answers from "./Answers";

const StandardFaqs = (props) => {
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [answersLength, setAnswersLength] = useState(0);
  const answers = useRef([]);
  const [questionsLength, setQuestionsLength] = useState(0);
  const questions = useRef([]);

  return (
    <Grid container direction="column" spacing={2} className="option-container">
      <Grid item xs={1} className="option-title">
        Standard FAQs
      </Grid>
      <Grid item xs={11} className="standard-faq-container-item">
        <Grid container direction="row" className="standard-faq-container">
          <Grid item xs={6} className="standard-faq-questions">
            <Typography>Questions</Typography>
            <Questions
              setAnswersLength={setAnswersLength}
              setQuestionsLength={setQuestionsLength}
              questionsLength={questionsLength}
              setSelectedIntent={setSelectedIntent}
              selectedIntent={selectedIntent}
              voicebotId={props.voicebotId}
              generatedAt={props.generatedAt}
              answers={answers}
              questions={questions}
            />
          </Grid>
          <Grid item xs={6} className="standard-faq-answers">
            <Typography>Answers</Typography>
            <Answers
              setAnswersLength={setAnswersLength}
              answersLength={answersLength}
              selectedIntent={selectedIntent}
              voicebotId={props.voicebotId}
              generatedAt={props.generatedAt}
              answers={answers}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StandardFaqs;
