function random (arr) {
	const newArr = arr
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
	}
	return newArr
}

const testQuestions = [
	{
		topic: 'History',
		question: 'In what year did the Berlin Wall fall?',
		answers: random(['1989', '1991', '1987', '1993']),
		correctAnswer: '1989',
		userAnswer: 0
	},
	{
		topic: 'History',
		question: 'Which European country colonized most of the African continent in the 19th century?',
		answers: random(['France', 'Germany', 'Portugal', 'Belgium']),
		correctAnswer: 'Belgium',
		userAnswer: 0
	},
	{
		topic: 'Entertainment',
		question: 'In what year was the first episode of the TV series "Friends" aired?',
		answers: random(['1994', '1995', '1996', '1997']),
		correctAnswer: '1994',
		userAnswer: 0
	},
	{
		topic: 'Entertainment',
		question: 'Which actor played the character of Neo in the movie "The Matrix"?',
		answers: random(['Keanu Reeves', 'Tom Cruise', 'Leonardo DiCaprio', 'Brad Pitt']),
		correctAnswer: 'Keanu Reeves',
		userAnswer: 0
	},
	{
		topic: 'Technology',
		question: 'Which company developed the programming language Java?',
		answers: random(['Sun Microsystems', 'Microsoft', 'Apple', 'IBM']),
		correctAnswer: 'Sun Microsystems',
		userAnswer: 0
	},
	{
		topic: 'Technology',
		question: 'Who is credited with inventing the World Wide Web (WWW)?',
		answers: random(['Tim Berners-Lee', 'Steve Jobs', 'Bill Gates', 'Mark Zuckerberg']),
		correctAnswer: 'Tim Berners-Lee',
		userAnswer: 0
	},
	{
		topic: 'Geography',
		question: 'What is the capital city of Australia?',
		answers: random(['Sydney', 'Melbourne', 'Canberra', 'Brisbane']),
		correctAnswer: 'Canberra',
		userAnswer: 0
	},
	{
		topic: 'Geography',
		question: 'Which country is both the smallest by land area and population?',
		answers: random(['Monaco', 'Nauru', 'Tuvalu', 'San Marino']),
		correctAnswer: 'Nauru',
		userAnswer: 0
	},
	{
		topic: 'Art',
		question: 'Who painted the famous artwork "The Starry Night"?',
		answers: random(['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo']),
		correctAnswer: 'Vincent van Gogh',
		userAnswer: 0
	},
	{
		topic: 'Art',
		question: 'Which French artist is famous for his colorful paintings of Tahitian landscapes and people?',
		answers: random(['Paul Gauguin', 'Claude Monet', 'Edgar Degas', 'Henri Matisse']),
		correctAnswer: 'Paul Gauguin',
		userAnswer: 0
	},
	{
		topic: 'Space',
		question: 'What is the largest planet in our solar system?',
		answers: random(['Jupiter', 'Saturn', 'Uranus', 'Neptune']),
		correctAnswer: 'Jupiter',
		userAnswer: 0
	},
	{
		topic: 'Space',
		question: 'What is the name of the first artificial satellite, launched into space by the Soviet Union in 1957?',
		answers: random(['Sputnik 1', 'Explorer 1', 'Vostok 1', 'Mercury-Redstone 3']),
		correctAnswer: 'Sputnik 1',
		userAnswer: 0
	},
	{
		topic: 'Science',
		question: 'What is the chemical symbol for gold?',
		answers: random(['Au', 'Ag', 'Cu', 'Fe']),
		correctAnswer: 'Au',
		userAnswer: 0
	},
	{
		topic: 'Science',
		question: 'What is the smallest unit of matter?',
		answers: random(['Atom', 'Molecule', 'Cell', 'Electron']),
		correctAnswer: 'Atom',
		userAnswer: 0
	},
	{
		topic: 'General culture',
		question: 'Which famous playwright wrote the play "Hamlet"?',
		answers: random(['William Shakespeare', 'Tennessee Williams', 'Arthur Miller', 'Samuel Beckett']),
		correctAnswer: 'William Shakespeare',
		userAnswer: 0
	},
	{
		topic: 'General culture',
		question: 'Which famous novel by George Orwell tells the story of a society where government surveillance and propaganda control all aspects of people\'s lives?',
		answers: random(['1984', 'Animal Farm', 'Brave New World', 'Fahrenheit 451']),
		correctAnswer: '1984',
		userAnswer: 0
	}
]

export default testQuestions
