const { App, ReceiverMultipleAckError } = require('@slack/bolt');
const { verifySignatureAndParseRawBody } = require('@slack/bolt/dist/receivers/ExpressReceiver');

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

//


//



//send user message
app.message('goodbye', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log(message)
  await send_form(["UMENGK7K8"], "title", [{"type": "radio", "answers": ["one", "two"], "question": "testq"}] );
    
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();


//send message to users
async function send_form(users, title, questions) {
  
    const form = formJson(title, questions);
    users.forEach(async (user) => {
      console.log(user)
      try {
        console.log("boutta send it")
        try {
          await app.client.chat.postMessage( {
            token: process.env.SLACK_APP_TOKEN,
            "channel": user,
            "blocks": form,
            "text": "this is text"
          })
        }
        catch(error) {
          console.log(error)
          console.log("bad")
        }
        console.log("sent")
      }
      catch {
        console.log("big goof")
      }
      
    });
    console.log("u did it!")

  
  

};


//log form submissions

app.action('testq', async ({body, client, ack}) => { 
  await ack();
  console.log(body.message)
  /*
  try {
    if (body.message) {
      const result = await send_to_sheets({
        body
      });

      console.log(result);
    }
  }

  catch(error) {
    console.error(error);
  }
  */
});


/*
formJson: String JSON[] -> JSON
where each element in questions has the form: {
  "type": String,
  "answers": String[],
  "question": String
}
returns the array of blocks for an interactive message
*/

function formJson(title, questions) {
  const blocks = [];
  blocks.push({
    "type": "header",
    "text": plainText(title)
  });

  questions.forEach((question) => {
    blocks.push(formatQuestion(question))
  });

  return blocks;
}


/*
formatQuestion: ({String, String[], String}) -> JSON
returns the JSON block for the given question
*/
function formatQuestion({type, answers, question}) {
  const options = [];
  answers.forEach((text) => {
    options.push({
      "text": plainText(text),
      "value": text
    });
  });

  return {
    "type": "input",
    "element": {
      "type": type,
      "options": options,
      "action_id": question,
      "label": plainText(question)
    }
  };

}

/*
plainText: String -> JSON
returns a simple plain text block
 */
function plainText(text) {
  return {
    "type": "plain_text",
    "text": text,
    "emoji": true
  };
}

