const HELP_MESSAGE = "You must provide a survey type with the /create-survey command. Please either type \"/create-survey mc\" for multiple choice, or \"/create-survey radio\" for radio.";

const VALID_OPTIONS = {
  MC: 'mc',
  RADIO: 'radio',
}

const isValidCreateCommandText = (text) => {
  return text && Object.values(VALID_OPTIONS).includes(text);
}

const generateCreateSurveyHandler = (app) => async ({ command, ack, respond }) => {
  // Acknowledge command request (required by slack API for commands)
  await ack();

  if (!isValidCreateCommandText(command.text)) {
    await respond(HELP_MESSAGE);
    return;
  }

  const userID = command.user_id;

  const res = await app.client.chat.postMessage({
    channel: userID,
    text: "pokemon unite"
  })

  console.log(res);
}

module.exports = generateCreateSurveyHandler;