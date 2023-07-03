import categoriesJSON from '@/assets/categories.json'

const MAX_QUESTIONS = 10
const MIN_QUESTIONS = 4
const TIMES = [10, 20, 30, 60]
const DEFAULT_TIME = 20
const DEFAULT_QUESTIONS = 5
const INFINITY_MODE = false
const TIME_MODE = false

export default function queryValidator (query) {
	const { questions, time, infinitymode, timemode, categories } = query
	const urlQueries = {}

	if (questions && Number(questions)) {
		if (Number(questions) > MAX_QUESTIONS) urlQueries.questions = MAX_QUESTIONS
		else if (Number(questions) < MIN_QUESTIONS) urlQueries.questions = MIN_QUESTIONS
		else urlQueries.questions = Number(questions)
	} else urlQueries.questions = DEFAULT_QUESTIONS

	if (time && Number(time)) {
		if (Number(time) > TIMES[TIMES.length - 1]) urlQueries.time = TIMES[TIMES.length - 1]
		else if (Number(time) < TIMES[0]) urlQueries.time = TIMES[0]
		else urlQueries.time = Number(time)
	} else urlQueries.time = DEFAULT_TIME

	if (infinitymode) {
		if (infinitymode === 'true' || infinitymode === true) urlQueries.infinitymode = true
		else urlQueries.infinitymode = false
	} else urlQueries.infinitymode = INFINITY_MODE

	if (timemode) {
		if (timemode === 'true' || timemode === true) urlQueries.timemode = true
		else urlQueries.timemode = false
	} else urlQueries.timemode = TIME_MODE

	if (categories) {
		const categoriesArray = typeof categories === 'string' ? categories.split(',') : categories
		const categoriesArrayFiltered = categoriesArray.filter(category => categoriesJSON.map(category => category.id).includes(category))
		if (categoriesArrayFiltered.length > 0) urlQueries.categories = categoriesArrayFiltered
		else urlQueries.categories = categoriesJSON.map(category => category.id)
	} else urlQueries.categories = categoriesJSON.map(category => category.id)

	return urlQueries
}

export const defaultQuestions = {
	minQuestions: MIN_QUESTIONS,
	maxQuestions: MAX_QUESTIONS
}

export const defaultQuery = {
	questions: DEFAULT_QUESTIONS,
	time: DEFAULT_TIME,
	infinitymode: INFINITY_MODE,
	timemode: TIME_MODE,
	categories: categoriesJSON.map(category => category.id)
}
