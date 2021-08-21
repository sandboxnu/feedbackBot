const { generateView, INITIAL_MODAL_BLOCKS, updateViewNumAnswersForQuestion, updateViewNumQuestions } = require('./utils/blocks')

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

const numQuestionsSelectHandler = async ({ack, client, payload, body}) => {
  await ack();

  const newNumQuestions = parseInt(payload.selected_option.value)
  
  await client.views.update({
      view_id: body.view.id,
      view: updateViewNumQuestions(body.view, newNumQuestions)
  })
}

const generateNumAnswersHandler = (questionNumber) => async ({ack, payload, client, body}) => {
    await ack();

    const newNumAnswers = parseInt(payload.selected_option.value);

  await client.views.update({
      view_id: body.view.id,
      view: updateViewNumAnswersForQuestion(body.view, questionNumber, newNumAnswers)
  })
}

module.exports = {
    createSurveyHandler,
    numQuestionsSelectHandler,
    generateNumAnswersHandler,
}