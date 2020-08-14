import React, {useEffect, useState} from "react";

import VoicebotEventsService from '../../../../services/VoicebotEventsService';
import ConversationsHelper from '../../../../helpers/ConversationsHelper';
import './Conversations.scss';

import {Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useHistory} from "react-router-dom";
import AdbIcon from '@material-ui/icons/Adb';
import Person from '@material-ui/icons/Person';

const icons = {
  "stt_google_successful": <Person/>,
  "tts_request_successful": <AdbIcon/>
}

const Conversations = () => {
  const history = useHistory();
  const [conversations, setConversations] = useState("[]");

  useEffect(() => {
    VoicebotEventsService.readAll(
      1,
      history,
      (response) => {
        setConversations(JSON.stringify(response));
      }
    );
  });

  return (
    <Container className="conversations-container">
      <Typography>Voicebot Interactions</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Recording</TableCell>
              <TableCell>Transcription</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {JSON.parse(conversations).map((conversation) => {
              let normalizedConversation = ConversationsHelper.normalizeConversation(conversation);
              return (
                <TableRow key={conversation.id}>
                  <TableCell>{ icons[conversation.code] }</TableCell>
                  <TableCell>{ normalizedConversation.recording }</TableCell>
                  <TableCell>{ normalizedConversation.transcription }</TableCell>
                  <TableCell>{ normalizedConversation.date }</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Conversations;