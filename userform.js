
/*actuve Surveys: 
  stores aurveys responses that have not been submitted
*/
const divider = { 'type': 'divider' };

const generateUserForm = async ({ users, title, questions }) => {
  
  const form = formJson(title, questions);
  users.forEach((user) => {
    try {
      await app.client.chat.postMessage({
        "channel": user,
        "blocks": form,
        "text": "this is text"
      });
    }
    catch (error) {
      console.log(error)
    }
  })

}




/*
formJson: String JSON[] -> JSON
where each element in questions has the form: {
  "type": String,
  "answers": String[],
  "question": String
}
returns the array of blocks for an interactive message
*/


const formJson = (title, questions) => {
  const blocks = [];

  blocks.push({
    "type": "header",
    "text": plainText(title)
  });

  blocks.push(divider);


  questions.forEach((question) => {
    blocks.push(formatQuestion(question));
    blocks.push(divider);
  });

  blocks.push({
    "type": "actions",
    "elements": [
      {
        "type": "button",
        "text": plainText("Submit Response"),
        "value": "Submision",
        "action_id": "survey submit"
      }
    ]});

  return blocks;
}


/*
formatQuestion: ({String, String[], String}) -> JSON
returns the JSON block for the given question
*/
const formatQuestion = ({ type, answers, question }) => {
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
      "action_id": 'selection changed',
      "label": plainText(question)
    }
  };

}

/*
plainText: String -> JSON
returns a simple plain text block
 */
const plainText = (text) => {
  return {
    "type": "plain_text",
    "text": text,
    "emoji": true
  };
}

module.exports = generateUserForm;