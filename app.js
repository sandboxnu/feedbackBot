const { App } = require('@slack/bolt');
const generateCreateSurveyHandler = require('./generateCreateSurveyHandler')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
console.log(message)
  await say(`<@UM3U24PEY> just pooped his pants! OMG! 😱😱`);
});

// The echo command simply echoes on command
app.command('/create-survey', generateCreateSurveyHandler(app));

  app.action('surveyType-select', async ({ ack, payload, client }) => {
    ack();
    console.log(payload);
    client.views.update({
      view: {
        ...payload.view,
      }
    })
  });


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
