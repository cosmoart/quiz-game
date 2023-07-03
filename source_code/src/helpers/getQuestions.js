import offlineQuestions from '@/assets/questions.json'

function randomArray (arr) {
	const newArr = arr
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
	}
	return newArr
}

export default async function getQuestions (topics, qNumber) {
	const randomTopics = randomArray(topics)
	const messyTopics = []
	for (let i = 0; i < qNumber; i++) messyTopics.push(randomTopics[i % topics.length])

	function getOfflineQuestions () {
		const questionsPerTopic = {}
		messyTopics.forEach(topic => {
			if (!questionsPerTopic[topic]) questionsPerTopic[topic] = 0
			questionsPerTopic[topic]++
		})

		const questions = []
		Object.keys(questionsPerTopic).forEach(topic => {
			randomArray(offlineQuestions[topic]).slice(0, questionsPerTopic[topic]).forEach(question => {
				questions.push({
					...question,
					topic,
					answers: randomArray(question.answers),
					userAnswer: undefined,
					ia: false
				})
			})
		})

		return messyTopics.map(topic => {
			const question = questions.find(q => q.topic === topic)
			questions.splice(questions.indexOf(question), 1)
			return question
		})
	}

	if (process.env.NODE_ENV === 'development') {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// const error = new Error('Custom error')
				// error.statusCode = 350
				// reject(error)

				resolve(randomArray(getOfflineQuestions()))
			}, 1 * 1000)
		})
	}

	const iaQuestions = fetch('/api/questions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ topics: messyTopics.slice(0, 3) })
	}).then(res => res.json())
		.then(data => {
			if (data.statusCode >= 400) {
				const error = new Error(data.message)
				error.statusCode = data.status
				throw error
			} else return data
		})
		.catch(err => {
			console.log(err)
			throw err
		})

	return iaQuestions
		.then(iaQuestions => randomArray([...iaQuestions, ...getOfflineQuestions().slice(iaQuestions.length)]))
		.catch(() => randomArray(getOfflineQuestions()))
}
