import React, {useEffect, useState} from "react";

import VoicebotEventsService from '../../../../services/VoicebotEventsService';
import './Conversations.scss';

import {Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import SessionDetails from "./SessionDetails/SessionDetails";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Pagination from "@material-ui/lab/Pagination";


const Conversations = (props) => {
  const history = useHistory();
  const [sessions, setSessions] = useState("[]");
  const [sessionsPage, setSessionsPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  useEffect(() => {
    VoicebotEventsService.readVoicebotSessions(
      props.voicebotId,
      sessionsPage,
      history,
      (response) => {
        let sessions = response.data
        setPagesCount(response.pages_count);
        setSessions(JSON.stringify(sessions));
      }
    );
  }, [history, props, sessionsPage]);

  const handleChange = (event, newPage) => {
    setSessionsPage(newPage);
  };

  return (
    <Container className="conversations-container">
      <Typography>Voicebot Interactions</Typography>
      {
        JSON.parse(sessions).map((session) => {
          return (
            <Accordion key={session.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="customize-content"
                id="customize-header"
              >
                <Typography>Session {session.session_id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SessionDetails session={session}/>
              </AccordionDetails>
            </Accordion>
          );
        })
      }
      <Pagination onChange={handleChange} count={pagesCount} color="primary" />
    </Container>
  );
}

export default Conversations;