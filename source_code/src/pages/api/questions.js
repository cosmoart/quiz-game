import offlineQuestions from '@/assets/questions.json'
const cohere = require('cohere-ai')
cohere.init(process.env.COHERE_API_KEY)

function defaultPromt () {
	const topics = Object.keys(offlineQuestions)
	const random3Topics = topics.sort(() => Math.random() - Math.random()).slice(0, 3)
	const randomQuestions = random3Topics.map(topic => {
		const randomQuestion = {
			...offlineQuestions[topic][Math.floor(Math.random() * offlineQuestions[topic].length)],
			topic
		}
		return randomQuestion
	})

	const text = randomQuestions.reduce((acc, question, index) => {
		const questionText = `question: ${question.question}\ntopic: ${question.topic}\n${question.answers.map(answer => `-${answer}`).join('\n')}\ncorrect: ${question.correctAnswer}\n\n`
		if (index === randomQuestions.length - 1) return acc + questionText.slice(0, -1)
		return acc + questionText
	}, '')

	return 'Generate 3 questions, ' + random3Topics.map(topic => `1 about ${topic}`).join(', ') + '. Each question has 4 answers (1 correct and 3 incorrect).\n---\n' + text + '---\n'
}

export default function handler (req, res) {
	if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST requests allowed', statusCode: 405 })
	if (!req.body.topics) return res.status(400).json({ message: 'Topics are required', statusCode: 400 })

	const promt = defaultPromt() + defaultPromt() + 'Generate 3 questions, ' + req.body.topics.map(topic => `1 about ${topic}`).join(', ') + '. Each question has 4 answers (1 correct and 3 incorrect).\n---'

	setTimeout(() => {
		res.status(500).json({ message: 'Request timed out', statusCode: 500 })
	}, 10 * 1000)

	cohere.generate({
		model: 'command',
		prompt: promt,
		max_tokens: 450,
		temperature: 0.8,
		k: 0,
		stop_sequences: ['---'],
		return_likelihoods: 'NONE'
	})
		.then(response => {
			if (response.statusCode >= 400) {
				return res.status(500).json({
					message: response.body.message || 'Something went wrong',
					statusCode: response.statusCode || 500
				})
			}
			res.status(200).json(response.body.generations[0].text.split('\n\n').map(question => {
				if (question.startsWith('\n')) question = question.slice(1)
				if (question.endsWith('\n')) question = question.slice(0, -1)
				const questionArray = question.split('\n')
				const questionObject = {
					question: questionArray[0].split('question: ')[1]?.trim(),
					topic: questionArray[1].split('topic: ')[1]?.trim(),
					answers: questionArray.slice(2, 6).map(answer => answer.split('-')[1]?.trim()),
					correctAnswer: questionArray[6].split('correct: ')[1]?.trim(),
					userAnswer: undefined,
					ia: true
				}
				return questionObject
			}))
		})
		.catch(err => {
			console.log(err)
			const message = err.body.message || 'Something went wrong'
			const statusCode = err.statusCode || 500
			return res.status(500).json({ message, statusCode })
		})
}
