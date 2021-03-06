module.exports.normalizeConversation = (beConversation) => {
  let conversation = {};

  for (let conversationIndex in beConversation) {
    let conversationPart = beConversation[conversationIndex];
    conversation["code"] = conversationPart.code;
    conversation["id"] = conversationPart.id;
    conversation["created_at"] = conversationPart.created_at;
    switch (conversationPart.code) {
      case "stt_google_successful":
        conversation["questionRecording"] = conversationPart.details.recording_url;
        conversation["question"] = conversationPart.details.transcript;
        break;
      case "tts_request_successful":
        conversation["answersData"] = conversationPart.details.answers;
        break;
      case "greeting_message":
        conversation["question"] = '-';
        conversation["answersData"] = [conversationPart.details];
        conversation["questionRecording"] = conversationPart.details.greeting_url;
        break;
      case "bot_info_message":
        conversation["question"] = '-';
        conversation["answersData"] = [conversationPart.details];
        conversation["question"] = '-';
        break;
      default:
        break;
    }
  }

  return conversation;
}