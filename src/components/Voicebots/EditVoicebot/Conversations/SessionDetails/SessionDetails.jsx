import React, {useEffect, useState} from "react";

import VoicebotEventsService from "../../../../../services/VoicebotEventsService";
import './SessionDetails.scss';
import ConversationsHelper from "../../../../../helpers/ConversationsHelper";
import ConversationPlayer from "./ConversationPlayer";

import {Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";

const SessionDetails = (props) => {
  const history = useHistory();
  const [conversations, setConversations] = useState("{}");
  const conversationsColumns = [
    {
      title: 'Recording',
      field: 'recording',
      width: 50
    },
    { title: 'Question', field: 'question' },
    { title: 'Answer', field: 'answer' },
    { title: 'Created', field: 'created_at', defaultSort: 'asc' }
  ];

  useEffect(() => {
    VoicebotEventsService.readSessionConversations(
      props.session.session_id,
      history,
      (response) => {
        setConversations(JSON.stringify(response));
      }
    );
  });

  const conversationsData = (conversations) => {
    let sessionConv = [];
    let localConversations = JSON.parse(conversations)

    for (let conversationId in localConversations) {
      let normalizedConversation = ConversationsHelper.normalizeConversation(localConversations[conversationId]);
      let date = new Date(normalizedConversation.created_at);
      let answerText = "";
      if (normalizedConversation.answersData) {
        switch (normalizedConversation.code) {
          case 'stt_google_successful':
          case 'tts_request_successful':
            normalizedConversation.answersData.forEach((answer, _index) => {
              answerText += answer.response_text + " - "; 
            });
            answerText = answerText.slice(0, -3); 
            break;
          case 'greeting_message':
              answerText += normalizedConversation.answersData[0].greeting_message; 
            break;
          case 'bot_info_message':
              answerText += normalizedConversation.answersData[0].message; 
            break;   
          default:
            console.log("<SessionDetails> ERROR (conversationsData): Unrecognised conversation code " + normalizedConversation.code);
            break;
        }
      }
      const recording = (normalizedConversation.questionRecording &&
                        <ConversationPlayer
                          id={normalizedConversation.id}
                          questionRecording={normalizedConversation.questionRecording}
                          answersData={normalizedConversation.answersData}
                        />);
      sessionConv.push(
        {
          recording: recording,
          question: normalizedConversation.question,
          answer: answerText,
          created_at: date.toLocaleString('en-US', { timeZone: 'EST' }).toString()
        }
      );
    }
    return sessionConv;
  }

  return (
    <Container className="session-details-container">
      <Typography>Session Details</Typography>
      <MaterialTable
        options={{
          search: false,
          toolbar: false
        }}
        columns={conversationsColumns}
        data={conversationsData(conversations)}
      />
    </Container>
  );
}

export default SessionDetails;
