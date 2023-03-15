import offlineQuestions from './offlineQuestions.json'

function randomArray (arr) {
	const newArr = arr
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
	}
	return newArr
}

export default function devQuestions (topicsArray, number) {
	const topics = []

	for (let i = 0; i < number; i++) {
		topics.push(topicsArray[i % topicsArray.length])
	}

	return topics.map(topic => {
		const randomNumber = Math.floor(Math.random() * offlineQuestions[topic].length)
		return {
			...offlineQuestions[topic][randomNumber],
			topic,
			answers: randomArray(offlineQuestions[topic][randomNumber].answers),
			userAnswer: 0,
			offline: true
		}
	})
}
