const generateNSizedIncreasingIntArrayStartingAt = require('./utils/generateNSizedIncreasingIntArrayStartingAt');

const HELP_MESSAGE = "You must provide a survey type with the /create-survey command. Please either type \"/create-survey mc\" for multiple choice, or \"/create-survey radio\" for radio.";

const generateSelectNumberOption = (number) => ({
					"text": {
						"type": "plain_text",
						"text": number.toString(),
						"emoji": true
					},
					"value": number.toString()
				
})

const generateAnswerObject = (answerNumber) => ({
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-action"
			},
			"label": {
				"type": "plain_text",
				"text": `Answer #${answerNumber}`,
				"emoji": true
			}
})

const generateAnswerSection = (numAnswers) => generateNSizedIncreasingIntArrayStartingAt(numAnswers, 1).map(generateAnswerObject)

const generateSingleQuestionSection = (questionNumber, numAnswers = 2) => [
	{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": `Question ${questionNumber}`,
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Question Type"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an item",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Multiple Choice",
							"emoji": true
						},
						"value": "mc"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Radio",
							"emoji": true
						},
						"value": "radio"
					}
				],
				"action_id": "static_select-action"
			}
		},
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "plain_text_input-action"
			},
			"label": {
				"type": "plain_text",
				"text": "Question Text",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "How many answers to this question?"
			},
			"accessory": {
				"type": "static_select",
				"initial_option": generateSelectNumberOption(2),
				"options": [2,3,4].map(generateSelectNumberOption),
				"action_id": `num-answers-Q${questionNumber}`
			}
		},
		...generateAnswerSection(numAnswers)
]

const generateQuestionsSection = (numQuestions) =>
	generateNSizedIncreasingIntArrayStartingAt(numQuestions, 1).reduce((acc, questionNumber) => [...acc, ...generateSingleQuestionSection(questionNumber)], []);

const INITIAL_MODAL_BLOCKS = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "How many questions do you want?"
			},
			"accessory": {
				"type": "static_select",
				"initial_option": generateSelectNumberOption(1),
				"options": [1,2,3,4].map(generateSelectNumberOption),
				"action_id": "num-questions-select"
			}
		},
		{
			"type": "divider"
		},
		...generateQuestionsSection(1)
	]


const generateView = (blocks) => (
{
  "type": "modal",
  "callback_id": "modal-identifier",
  "title": {
    "type": "plain_text",
    "text": "Create Survey"
  },
          "submit": {
            "type": "plain_text",
            "text": "Create"
        },
   blocks, 
  
})

const generateCreateSurveyHandler = (app) => async ({ command, client, ack, payload, respond }) => {
  // Acknowledge command request (required by slack API for commands)
  await ack();

  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view: generateView(INITIAL_MODAL_BLOCKS)
    });
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = generateCreateSurveyHandler;