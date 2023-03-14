import devQuestions from './devQuestions'

export default function getQuestions (topics, qNumber) {
	// if (process.env.NODE_ENV === 'development') {
	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(() => {
	// 			// const error = new Error('Custom error')
	// 			// error.statusCode = 350
	// 			// reject(error)
	// 			resolve(devQuestions(qNumber))
	// 		}, 1 * 1000)
	// 	})
	// }
	return new Promise((resolve, reject) => {
		fetch('/api/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ questions: qNumber, topics })
		}).then(res => res.json())
			.then(data => {
				if (data.statusCode >= 400) {
					const error = new Error(data.message)
					error.statusCode = data.status
					reject(error)
				} else resolve(data)
			})
			.catch(err => reject(err))
	})
}
