const HELP_MESSAGE = "You must provide a survey type with the /create-survey command. Please either type \"/create-survey mc\" for multiple choice, or \"/create-survey radio\" for radio.";

const VALID_OPTIONS = {
  MC: 'mc',
  RADIO: 'radio',
}

const isValidCreateCommandText = (text) => {
  return text && Object.values(VALID_OPTIONS).includes(text);
}

const INITIAL_MODAL_BLOCKS = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Let's get started making a feedback survey."
			}
		},
		{
			"type": "input",
			"element": {
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
				"action_id": "surveyType-select"
			},
			"label": {
				"type": "plain_text",
				"text": "Survey Type",
				"emoji": true
			}
		}
	]


const generateView = (blocks) => (
{
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "FeedbackBot"
        },
        "close": {
          "type": "plain_text",
          "text": "Close"
        },
        blocks
      
})

const generateCreateSurveyHandler = (app) => async ({ command, client, ack, payload, respond }) => {
  // Acknowledge command request (required by slack API for commands)
  await ack();


  try {
    // Call the views.open method using the WebClient passed to listeners
    const result = await client.views.open({
      trigger_id: payload.trigger_id,
      view:{
  "type": "modal",
  "callback_id": "modal-identifier",
  "title": {
    "type": "plain_text",
    "text": "Just a modal"
  },
          "submit": {
            "type": "plain_text",
            "text": "Create"
        },
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Let's get started making a feedback survey."
			}
		},
		{
			"type": "input",
			"element": {
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
				"action_id": "surveyType-select"
			},
			"label": {
				"type": "plain_text",
				"text": "Survey Type",
				"emoji": true
			}
		}
	]
}
    });

    console.log(result);
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = generateCreateSurveyHandler;