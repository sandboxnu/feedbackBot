const { App, onlyViewActions } = require('@slack/bolt');
const { numQuestionsSelectHandler, createSurveyHandler } = require('./creationFormHandlers')
const generateNSizedIncreasingIntArrayStartingAt = require('./utils/generateNSizedIncreasingIntArrayStartingAt')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
console.log(message)
  await say(`<@UM3U24PEY> just pooped his pants! OMG! 😱😱`);
});


// Creation form handlers
app.command('/create-survey', createSurveyHandler);
app.action('num-questions-select', numQuestionsSelectHandler);
// throwaway action handlers for selects that are non-interactive
generateNSizedIncreasingIntArrayStartingAt(5, 1).forEach(i => {
  app.action(`num-answers-Q${i}`, async ({ ack }) => await ack());
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
