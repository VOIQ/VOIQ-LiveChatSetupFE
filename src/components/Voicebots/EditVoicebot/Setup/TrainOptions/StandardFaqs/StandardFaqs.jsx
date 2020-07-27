import React, {useRef, useState} from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import '../Options.scss';
import './StandardFaqs.scss';

import Questions from "./Questions";
import Answers from "./Answers";

const StandardFaqs = () => {
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [answersCount, setAnswersCount] = useState(0);
  const answers = useRef(null);
  const questions = useRef(null);

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
              questions={questions}
              set_selected_intent={setSelectedIntent}
              answers={answers}
              set_answers_count={setAnswersCount}
              selected_intent={selectedIntent}
            />
          </Grid>
          <Grid item xs={6} className="standard-faq-answers">
            <Typography>Answers</Typography>
            <Answers
              answers={answers}
              answers_count={answersCount}
              set_answers_count={setAnswersCount}
              selected_intent={selectedIntent}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StandardFaqs;
