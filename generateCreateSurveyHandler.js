const { generateView, INITIAL_MODAL_BLOCKS } = require('./utils/blocks');

const generateCreateSurveyHandler = (app) => async ({ command, client, ack, payload }) => {
	// Acknowledge command request (required by slack API for commands)
	await ack();

	try {
		// Call the views.open method using the WebClient passed to listeners
		await client.views.open({
			trigger_id: payload.trigger_id,
			view: generateView(INITIAL_MODAL_BLOCKS)
		});
	}
	catch (error) {
		console.log(error)
	}
}

module.exports = generateCreateSurveyHandler;