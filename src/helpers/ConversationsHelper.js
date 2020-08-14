module.exports.normalizeConversation = (beConversation) => {
  switch (beConversation.code) {
    case "stt_google_successful":
      return {
        date: beConversation.created_at,
        recording: beConversation.details.recording_url,
        transcription: beConversation.details.transcript
      };
    case "tts_request_successful":
      return {
        date: beConversation.created_at,
        recording: beConversation.details.response_url,
        transcription: beConversation.details.response_text
      };
    default:
      return {};
  }
}