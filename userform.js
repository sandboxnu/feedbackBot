
//send user message
app.message('goodbye', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log(message)
    await say(`<@UM3U24PEY> just pooped his pants! OMG! 😱😱`);
  });




//log form submissions
/*
app.action({}, async ({body, client, ack}) => {
  await ack();
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
});
*/

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
        "action_id": label,
        "label": plainText(label)
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
  