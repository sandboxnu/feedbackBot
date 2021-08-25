const { App, ReceiverMultipleAckError } = require('@slack/bolt');
const { verifySignatureAndParseRawBody } = require('@slack/bolt/dist/receivers/ExpressReceiver');
const generateUserForm = require('./userform')

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

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();


//Ack selections
app.action({ action_id: 'selection changed' },
  async ({ ack }) => {
    await ack();
  });

//handle submissions
app.action({ action_id: 'survey submit' },
  async ({ body, client, ack }) => {
    await ack();
    try {
      if (body.message) {
        //parse and store data 

      }
    }
    catch (error) {
      console.log(error);
    }

  })