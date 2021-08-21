const { generateView, generateQuestionsSection, VIEW_ID, INITIAL_MODAL_BLOCKS } = require('./utils/blocks')

const createSurveyHandler = async ({ client, ack, payload }) => {
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

const numQuestionsSelectHandler = async ({ack, client, payload}) => {
  await ack();

  const newNumQuestions = parseInt(payload.selected_option.value)
  
  await client.views.update({
      external_id: VIEW_ID,
      view: generateView(generateQuestionsSection(newNumQuestions))
  })
}

module.exports = {
    createSurveyHandler,
    numQuestionsSelectHandler,
}