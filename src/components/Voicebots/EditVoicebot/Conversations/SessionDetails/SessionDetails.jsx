import React, {useEffect, useState} from "react";

import VoicebotEventsService from "../../../../../services/VoicebotEventsService";
import './SessionDetails.scss';

import {Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import MaterialTable from "material-table";
import ConversationsHelper from "../../../../../helpers/ConversationsHelper";
import ConversationPlayer from "./ConversationPlayer";

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
    { title: 'Created', field: 'created_at' }
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
    for (let conversation_id in localConversations) {
      let normalizedConversation = ConversationsHelper.normalizeConversation(localConversations[conversation_id]);
      sessionConv.push(
        {
          recording: <ConversationPlayer
            id={normalizedConversation.id}
            questionRecording={normalizedConversation.questionRecording}
            answerRecording={normalizedConversation.answerRecording}
          />,
          question: normalizedConversation.question,
          answer: normalizedConversation.answer,
          created_at: normalizedConversation.created_at
        }
      );
    }
    return sessionConv;
  }

  return (
    <div>
      <Typography>Session Details</Typography>
      <MaterialTable
        options={{
          search: false,
          toolbar: false
        }}
        columns={conversationsColumns}
        data={conversationsData(conversations)}
      />
    </div>
  );
}

export default SessionDetails;
