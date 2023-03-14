import prompts from '@/helpers/promts'
const cohere = require('cohere-ai')
cohere.init(process.env.COHERE_API_KEY)

function randomArray (arr) {
	const newArray = [...arr]
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
	}
	return newArray
}

export default function handler (req, res) {
	if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST requests allowed', statusCode: 405 })
	if (!req.body.questions) return res.status(400).json({ message: 'Questions number is required', statusCode: 400 })
	if (!req.body.topics) return res.status(400).json({ message: 'Topics are required', statusCode: 400 })

	const questionsNumber = req.body.questions
	const topicsArray = req.body.topics
	const questions = []
	const topics = []

	for (let i = 0; i < questionsNumber; i++) {
		topics.push(topicsArray[i % topicsArray.length])
	}

	return Promise.all(randomArray(topics).map((topic, index) => {
		return new Promise((resolve, reject) => {
			cohere.generate({
				model: 'xlarge',
				prompt: prompts[topic],
				max_tokens: 65,
				temperature: 0.3,
				k: 0,
				p: 0.75,
				stop_sequences: ['--'],
				frequency_penalty: 0.9,
				presence_penalty: 0.36,
				return_likelihoods: 'NONE'
			}).then(response => {
				if (response.statusCode >= 400) return reject(response)
				resolve(response)
			}).catch(err => reject(err))
		})
	})).then((responses) => {
		try {
			responses.forEach((response, i) => {
				const resp = response.body.generations[0].text
				questions.push({
					topic: topics[i],
					question: resp.split('\n')[1].split('Question: ')[1],
					answers: randomArray(resp.split('\n').slice(2, 6).map((answer) => answer.split('- ')[1])),
					correctAnswer: resp.split('\n')[6].split('Correct: ')[1],
					userAnswer: 0
				})
			})
		} catch (err) {
			return res.status(500).json(err || { message: 'Something went wrong', statusCode: 500 })
		}
	}).then(() => res.status(200).json(questions))
		.catch(err => {
			const message = err.body.message || 'Something went wrong'
			const statusCode = err.statusCode || 500
			return res.status(500).json({ message, statusCode })
		})
}
