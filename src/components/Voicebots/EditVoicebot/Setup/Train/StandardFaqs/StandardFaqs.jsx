import React, {useState} from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import '../Options.scss';
import './StandardFaqs.scss';

import Questions from "./Questions";
import Answers from "./Answers";

const StandardFaqs = (props) => {
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [answers, setAnswers] = useState("[]");
  const [questions, setQuestions] = useState("[]");

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
              setAnswers={setAnswers}
              answers={answers}
              setQuestions={setQuestions}
              questions={questions}
              setSelectedIntent={setSelectedIntent}
              selectedIntent={selectedIntent}
              voicebotId={props.voicebotId}
              generatedAt={props.generatedAt}
            />
          </Grid>
          <Grid item xs={6} className="standard-faq-answers">
            <Typography>Answers</Typography>
            <Answers
              setAnswers={setAnswers}
              answers={answers}
              selectedIntent={selectedIntent}
              voicebotId={props.voicebotId}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StandardFaqs;
