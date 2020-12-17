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
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {CopyToClipboard} from "react-copy-to-clipboard";
import ReactCountryFlag from "react-country-flag";
import Tooltip from '@material-ui/core/Tooltip';

const Conversations = (props) => {
  const history = useHistory();
  const [sessions, setSessions] = useState("[]");
  const [sessionsPage, setSessionsPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const flagStyle = {
     width: '20px',
     height: '15px',
     margin: '5px'
  };
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
    <Container className="conversations-container" >
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
                <Grid container>
                  <Grid item xs={4}>
                    <span className="session-text">Session {session.id}</span>
                    <CopyToClipboard text={session.session_id}>
                      <IconButton className="copy-session-button" onClick={(event) => { event.stopPropagation() }}><FileCopyIcon/></IconButton>
                    </CopyToClipboard>
                  </Grid>
                  { session.country || session.session_ip? 
                    <Tooltip placement="bottom-start" title={
                                                      <React.Fragment>
                                                        { session.country &&  <ReactCountryFlag svg style={flagStyle} countryCode={session.country} /> }{session.session_ip}
                                                      </React.Fragment>}>
                      <Grid item xs={4}>
                        { session.voicebot_user && <Typography>{session.voicebot_user.name} - {session.voicebot_user.email}</Typography> } 
                      </Grid>
                    </Tooltip> 
                    : 
                    <Grid item xs={4}>
                      { session.voicebot_user && <Typography>{session.voicebot_user.name} - {session.voicebot_user.email}</Typography> } 
                    </Grid>
                  }
                  <Grid item xs={4}>
                    { session.recording_url && <audio className="session-player" controls><source src={session.recording_url} type="audio/mp3"/></audio> }
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <SessionDetails session={session}/>
              </AccordionDetails>
            </Accordion>
          );
        
        })
      }
      <Grid container spacing={5} direction="column" justify="center" alignItems="center" className="paging">
        <Pagination onChange={handleChange} count={pagesCount} color="primary" />
      </Grid>
    </Container>
  );
}

export default Conversations;