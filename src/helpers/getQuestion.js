const cohere = require('cohere-ai');
cohere.init(process.env.NEXT_PUBLIC_COHERE_API_KEY);

export default async function getQuestion(topic) {
	// let response = await cohere.generate({
	// 	model: 'xlarge',
	// 	prompt: 'This program, given a topic, generates a question with 4 answers, the first being correct.\n--\nTopic: History\nQuestion: In what year did the battle of the ships of Tolosa take place?\nAnswers:\n- 1212\n- 1492\n- 1094\n- 1571\nCorrect: 1212\n--\nTopic: Literature\nQuestion: What is the verb in the following sentence: \"It was very cold yesterday\"?\nAnswers:\n- Was\n- Very\n- Yesterday\n- Cold\nCorrect: Was\n--\nTopic: Space\nQuestion: Which planet is the second closest to the sun?\nAnswers:\n- Venus\n- Mercury\n- Mars\n- Jupiter\nCorrect: Venus\n--\nTopic: History\nQuestion: What is the name of the French city where the treaty of Versailles was signed?\nAnswers:\n- Paris\n- Versailles\n- Rome\n- London\nCorrect: Paris\n--\nTopic: Tech\nQuestion: What is the name of the first computer?\nAnswers:\n- Eniac\n- Macintosh\n- Altair\n- UNIVAC\nCorrect: Eniac\n--\nTopic: Tech\nQuestion: How many bits are in a byte?\nAnswers:\n- 1\n- 8\n- 4\n- 16\nCorrect: 8\n--\nTopic: Space\nQuestion: Who is the first woman to have been to space?\nAnswers:\n- Valentina Tereshkova\n- Sally Ride\n- Ellen Ochoa\n- Kalpana Chawla\nCorrect: Valentina Tereshkova\n--\nTopic: History\nQuestion: What is the name of the first roman emperor?\nAnswers:\n- Julius Caesar\n- Romulus\n- Nero\n- Augustus\nCorrect: Augustus\n--\nTopic: Literature\nQuestion: What is the name of the young boy in \"The call of the wild\"?\nAnswers:\n- Buck\n- Sam\n- Dave\n- Peter\nCorrect: Buck\n--\nTopic: Space\n',
	// 	max_tokens: 80,
	// 	temperature: 0.7,
	// 	k: 0,
	// 	p: 0.75,
	// 	frequency_penalty: 0,
	// 	presence_penalty: 0,
	// 	stop_sequences: ["--"],
	// 	return_likelihoods: 'NONE'
	// })

	// console.log(response.body.generations[0].text);

	// response = response.body.generations[0].text.split('\n').slice(0, -1).reduce((acc, line) => {
	// 	if (line.startsWith('Topic:')) {
	// 		acc.topic = line.split('Topic:')[1].trim();
	// 	} else if (line.startsWith('Question:')) {
	// 		acc.question = line.split('Question:')[1].trim();
	// 	} else if (line.startsWith('Answers:')) {
	// 		acc.answers = [];
	// 	} else if (line.startsWith('-')) {
	// 		acc.answers.push(line.split('-')[1].trim());
	// 	} else if (line.startsWith('Correct:')) {
	// 		acc.correct = line.split('Correct:')[1].trim();
	// 	}
	// 	return acc;
	// }, {});

	// console.log(response);

	// for (let i = response.answers.length - 1; i > 0; i--) {
	// 	let j = Math.floor(Math.random() * (i + 1));
	// 	[response.answers[i], response.answers[j]] = [response.answers[j], response.answers[i]];
	// }

	// return response;


	const random = (arr) => {
		let newArr = arr;
		for (let i = newArr.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
		}
		return newArr;
	}

	return [
		{
			topic: 'History',
			question: '1 In what year did the battle of the ships of Tolosa take place?',
			answers: random(['1212', '1492', '1094', '1571']),
			correctAnswer: '1212',
			userAnswer: false
		},
		{
			topic: 'Art',
			question: '2 What is the verb in the following sentence: \"It was very cold yesterday\"?',
			answers: random(['Was', 'Very', 'Yesterday', 'Cold']),
			correctAnswer: 'Was',
			userAnswer: false
		},
		{
			topic: 'Space',
			question: '3 Which planet is the second closest to the sun?',
			answers: random(['Venus', 'Mercury', 'Mars', 'Jupiter']),
			correctAnswer: 'Venus',
			userAnswer: false,
		},
		{
			topic: 'Geography',
			question: '4 What is the name of the French city where the treaty of Versailles was signed?',
			answers: random(['Paris', 'Versailles', 'Rome', 'London']),
			correctAnswer: 'Paris',
			userAnswer: false
		},
		{
			topic: 'General culture',
			question: '5 What is the name of the first computer?',
			answers: random(['Is named Astro because yes', 'Versailles', 'Rome', 'London']),
			correctAnswer: 'Paris',
			userAnswer: false
		},
		{
			topic: 'General culture',
			question: '6 What is the name of the first computer?',
			answers: random(['Is named Astro because yes', 'Versailles', 'Rome', 'London']),
			correctAnswer: 'Paris',
			userAnswer: false
		},
		{
			topic: 'General culture',
			question: '7 What is the name of the first computer?',
			answers: random(['Is named Astro because yes', 'Versailles', 'Rome', 'London']),
			correctAnswer: 'Paris',
			userAnswer: false
		},
		{
			topic: 'General culture',
			question: '8 What is the name of the first computer?',
			answers: random(['Is named Astro because yes', 'Versailles', 'Rome', 'London']),
			correctAnswer: 'Paris',
			userAnswer: false
		},
		{
			topic: 'General culture',
			question: '9 What is the name of the first computer?',
			answers: random(['Is named Astro because yes', 'Versailles', 'Rome', 'London']),
			correctAnswer: 'Paris',
			userAnswer: false
		},
	]
}