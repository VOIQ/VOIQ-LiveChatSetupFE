import React, {useEffect} from "react";

import IntentsService from "../../../../../../services/IntentsService";

import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import IntentUtterances from "./IntentUtterances";
import { Typography } from "@material-ui/core";

const Intents = (props) => {
  const history = useHistory();
  const answers = props.answers;
  const setAnswers = props.setAnswers;
  const intents = props.intents;
  const setIntents = props.setIntents;
  const selectedUtterance = props.selectedUtterance;
  const setSelectedUtterance = props.setSelectedUtterance;
  const voicebotId = props.voicebotId;

  useEffect(() => {
    IntentsService.readAll(
      voicebotId,
      history,
      (response) => {
        setIntents(JSON.stringify(response));
      }
    );
  }, [history, answers, intents, setAnswers, setIntents, setSelectedUtterance, voicebotId, selectedUtterance]);

  return (
    <Container>
      <Typography>{props.intent}</Typography>
      {
        JSON.parse(intents) && JSON.parse(intents).map((intent) => (
            <Accordion key={intent.id} generated_at={props.generated_at}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="customize-content"
                id="customize-header"
              >
                <Grid container>
                  <span className="session-text">{intent.name}</span>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <IntentUtterances
                  intentId={intent.id}
                  voicebotId={voicebotId}
                  selectedUtterance={selectedUtterance}
                  setSelectedUtterance={setSelectedUtterance}
                  setAnswers={setAnswers}
                />
              </AccordionDetails>
            </Accordion>
          )
        )
      }
    </Container>
  );
}

export default Intents;
