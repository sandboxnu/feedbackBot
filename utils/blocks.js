const generateNSizedIncreasingIntArrayStartingAt = require('./generateNSizedIncreasingIntArrayStartingAt');

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

const generateSingleQuestionSection = (questionNumber, numAnswers) => [
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
			"options": [2, 3, 4].map(generateSelectNumberOption),
			"action_id": `num-answers-Q${questionNumber}`
		}
	},
	...generateAnswerSection(numAnswers)
]

const generateQuestionsSection = (numQuestions) =>
	generateNSizedIncreasingIntArrayStartingAt(numQuestions, 1).reduce((acc, questionNumber) => [...acc, ...generateSingleQuestionSection(questionNumber, 2)], []);

const addHeader = (restOfModal) => [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "How many questions do you want?"
		},
		"accessory": {
			"type": "static_select",
			"initial_option": generateSelectNumberOption(1),
			"options": [1, 2, 3, 4].map(generateSelectNumberOption),
			"action_id": "num-questions-select"
		}
	},
	{
		"type": "divider"
	},
	...restOfModal
]

const INITIAL_MODAL_BLOCKS = generateQuestionsSection(1);

const generateView = (questionBlocks) => (
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
		blocks: addHeader(questionBlocks),
	});


// UPDATE HANDLERS -----------------------------

const updateViewNumQuestions = (view, newNumQuestions) => {
	const { id, team_id, blocks, close, state, hash, previous_view_id, root_view_id, app_id, app_installed_team_id, bot_id, ...usableViewValues } = view;
	return {
		...usableViewValues,
		blocks: updateBlocksNumQuestions(blocks, newNumQuestions)
	}
}

const isQuestionHeaderBlock = (block, number = undefined) => 
	block.type === 'header' && block.text && block.text.text && block.text.text.includes(number ? `Question ${number}` : 'Question');

const updateBlocksNumQuestions = (blocks, newNumQuestions) => {
	const prevNumberQuestions = blocks.reduce((seen, cur) => isQuestionHeaderBlock(cur) ? seen + 1 : seen, 0);
	const questionDifference = newNumQuestions - prevNumberQuestions;

	console.log(prevNumberQuestions, newNumQuestions)

	if (questionDifference === 0) {
		return blocks;
	} else if (questionDifference < 0) {
		const lastBlockIndex = blocks.findIndex((block) => isQuestionHeaderBlock(block, newNumQuestions + 1));
		console.log(lastBlockIndex)
		return blocks.slice(0, lastBlockIndex);
	} else {
		return [
			...blocks, 
			...generateNSizedIncreasingIntArrayStartingAt(questionDifference, prevNumberQuestions + 1)
				.reduce((acc, questionNumber) => [...acc, ...generateSingleQuestionSection(questionNumber, 2)], [])
		]
	}
}

const updateViewNumAnswersForQuestion = (view, questionNumber, newNumAnswers) => {

}

module.exports = {
    generateView,
	generateQuestionsSection,
	updateViewNumQuestions,
	updateViewNumAnswersForQuestion,
	INITIAL_MODAL_BLOCKS
}