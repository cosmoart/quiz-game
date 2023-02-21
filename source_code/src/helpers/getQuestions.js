import promts from './promts'
import testQuestions from './questions'
const cohere = require('cohere-ai')
cohere.init(process.env.NEXT_PUBLIC_COHERE_API_KEY)

export default async function getQuestions (topicsArray, questionsNumber) {
	function random (arr) {
		const newArr = arr
		for (let i = newArr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
		}
		return newArr
	}

	return new Promise((resolve, reject) => {
		const questions = []
		const topics = []

		for (let i = 0; i < questionsNumber; i++) {
			topics.push(topicsArray[i % topicsArray.length])
		}

		Promise.all(random(topics).map(async (topic) => {
			const response = await cohere.generate({
				model: 'xlarge',
				prompt: promts[topic],
				max_tokens: 65,
				temperature: 0.3,
				k: 0,
				p: 0.75,
				stop_sequences: ['--'],
				frequency_penalty: 0.9,
				presence_penalty: 0.36,
				return_likelihoods: 'NONE'
			})
			if (response.statusCode >= 400) return reject(response)
			return response
		})).then((responses) => {
			try {
				responses.forEach((response, i) => {
					const res = response.body.generations[0].text
					questions.push({
						topic: topics[i],
						question: res.split('\n')[1].split('Question: ')[1],
						answers: random(res.split('\n').slice(2, 6).map((answer) => answer.split('- ')[1])),
						correctAnswer: res.split('\n')[6].split('Correct: ')[1],
						userAnswer: 0
					})
				})
			} catch (err) {
				reject(err || { message: 'Something went wrong' })
			}
		}).catch(err => {
			reject(err[0] || { message: 'Something went wrong' })
		}).then(() => resolve(questions))
	})

	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		// const error = new Error('Custom error')
	// 		// error.statusCode = 350
	// 		// error.body = { message: 'Custom error' }
	// 		// reject(error)
	// 		resolve(random(testQuestions).slice(0, questionsNumber))
	// 	}, 1000)
	// })
}
