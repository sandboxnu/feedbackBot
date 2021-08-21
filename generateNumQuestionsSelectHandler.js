const { generateView, generateQuestionsSection, VIEW_ID } = require('./utils/blocks')

const generateNumQuestionsSelectHandler = (app) => async ({ack, client, payload}) => {
  await ack();

  const newNumQuestions = parseInt(payload.selected_option.value)
  
  await client.views.update({
      external_id: VIEW_ID,
      view: generateView(generateQuestionsSection(newNumQuestions))
  })
}

module.exports = generateNumQuestionsSelectHandler;