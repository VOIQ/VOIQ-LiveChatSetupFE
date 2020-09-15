module.exports.normalizeConversation = (beConversation) => {
  let conversation = {};

  for (let conversationIndex in beConversation) {
    let conversationPart = beConversation[conversationIndex];
    switch (conversationPart.code) {
      case "stt_google_successful":
        conversation["id"] = conversationPart.id;
        conversation["created_at"] = conversationPart.created_at;
        conversation["questionRecording"] = conversationPart.details.recording_url;
        conversation["question"] = conversationPart.details.transcript;
        break;
      case "tts_request_successful":
        conversation["answersData"] = conversationPart.details.answers;
        break;
      default:
        break;
    }
  }

  return conversation;
}