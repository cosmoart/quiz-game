import categoriesJSON from "@/assets/categories.json"

const MAX_QUESTIONS = 10;
const MIN_QUESTIONS = 4;
const TIMES = [10, 20, 30, 60];
const MODES = ['Classic', 'Time', 'Infinity'];
const DEFAULT_MODE = 'Classic';
const DEFAULT_TIME = 20;
const DEFAULT_QUESTIONS = 5;

function queryValidator(query) {
	const { questions, time, mode, categories } = query;
	let urlQueries = {};

	if (questions && Number(questions)) {
		if (questions > MAX_QUESTIONS) urlQueries.questions = MAX_QUESTIONS;
		else if (questions < MIN_QUESTIONS) urlQueries.questions = MIN_QUESTIONS;
		else urlQueries.questions = questions;
	} else urlQueries.questions = DEFAULT_QUESTIONS;

	if (time && Number(time)) {
		if (time > TIMES[TIMES.length - 1]) urlQueries.time = TIMES[TIMES.length - 1];
		else if (time < TIMES[0]) urlQueries.time = TIMES[0];
		else urlQueries.time = time;
	} else urlQueries.time = DEFAULT_TIME;

	if (mode) {
		if (MODES.includes(mode)) urlQueries.mode = mode;
		else urlQueries.mode = DEFAULT_MODE;
	} else urlQueries.mode = DEFAULT_MODE;

	if (categories) {
		const categoriesArray = categories.split(',');
		const categoriesArrayFiltered = categoriesArray.filter(category => categoriesJSON.map(category => category.id).includes(category));
		if (categoriesArrayFiltered.length > 0) urlQueries.categories = categoriesArrayFiltered;
		else urlQueries.categories = categoriesJSON.map(category => category.id);
	} else urlQueries.categories = categoriesJSON.map(category => category.id);

	return urlQueries;
}

export default queryValidator;

export const quiziConfig = {
	questions: DEFAULT_QUESTIONS,
	time: DEFAULT_TIME,
	mode: DEFAULT_MODE,
	categories: categoriesJSON.map(category => category.id),
	minQuestions: MIN_QUESTIONS,
	maxQuestions: MAX_QUESTIONS,
	times: TIMES,
	modes: MODES,
	defaultMode: DEFAULT_MODE,
	defaultTime: DEFAULT_TIME,
	defaultQuestions: DEFAULT_QUESTIONS,
}