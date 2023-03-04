import { useEffect, useState } from 'react'
import Wildcards from './Wildcards'
import GameOver from '../Play/GameOver'
import QuestionsNav from './QuestionsNav'
import categories from '@/assets/categories.json'
import useWildCards from '../../hooks/useWildCards'
import getQuestions from '@/helpers/getQuestions'
import QuestionSlider from './QuestionSlider'
import useQueries from '@/hooks/useQueries'

export default function Questions ({ setQuestions, questions }) {
	const [queries] = useQueries()
	const [win, setWin] = useState(0)
	const [score, setScore] = useState(1)
	const [current, setCurrent] = useState(1)
	const [time, setTime] = useState(Number(queries.time))
	const [wildCards, subtractWildcard] = useWildCards(queries)

	const [loading, setloading] = useState(false)
	const [error, setError] = useState(false)
	const [scoreInfinity, setScoreInfinity] = useState([1, 5])

	useEffect(() => {
		if (win !== 0) return
		if (!queries.timemode) return
		const timeInterval = setInterval(() => setTime(time => time > 0 ? time - 1 : time), 1000)
		return () => clearInterval(timeInterval)
	}, [queries.timemode, win])

	useEffect(() => {
		if (win !== 0) return
		if (time < 1) {
			if (queries.infinitymode && loading) return setError(true)
			if (wildCards.lives < 1) {
				clickAnswers(true, false)
				setWin(-1)
				answerSound(false)
			} else {
				subtractWildcard('lives')
				clickAnswers()
				answerSound(true)
			}
		}
	}, [time])

	useEffect(() => {
		const color = categories.find(cat => cat.name === questions[current - 1]?.topic)?.color
		document.body.style.backgroundColor = color
	}, [current])

	function getAnotherQuestions () {
		setloading(true)
		setCurrent(1)
		setTime(60)
		const topics = categories.filter(category => queries.categories.find(cat => cat === category.id)).map(cat => cat.name)
		getQuestions(topics, 5)
			.then((q) => setQuestions(q))
			.catch((err) => setError(err))
			.finally(() => {
				setScoreInfinity(scoreInfinity => [scoreInfinity[0] + 1, scoreInfinity[1] + 5])
				setTime(Number(queries.time))
				setloading(false)
			})
	}

	function clickAnswers (correct = true, addScore = true) {
		if (addScore) {
			setTimeout(() => {
				if (queries.infinitymode) setScoreInfinity(scoreInfinity => [scoreInfinity[0] + 1, scoreInfinity[1]])
				setTime(Number(queries.time))
				setScore(score => score + 1)
				changueCurrent(current + 1, true)
			}, 1000)
		}

		document.querySelectorAll(`.answer-${current}`).forEach(answer => {
			answer.disabled = true
			if (correct) {
				if (answer.textContent === questions[current - 1].correctAnswer) {
					answer.classList.add('correctAnswer')
					answer.parentNode.classList.add('shake-left-right')
				}
			}
		})
	}

	function changueCurrent (number, avoidState) {
		if (number > score && !avoidState) return

		document.querySelectorAll('[id^="question-"]').forEach(question => {
			question.classList.remove('slide-left', 'slide-right')
			if (question.id !== `question-${number}`) {
				question.classList.add(question.id.slice(-1) < number ? 'slide-left' : 'slide-right')
			}
		})

		setCurrent(number)
	}

	function answerSound (correct = true) {
		if (localStorage.getItem('sound') === 'true') {
			const sound = new Audio(correct ? '/sounds/correct_answer.mp3' : '/sounds/wrong_answer.mp3')
			sound.volume = 0.3
			sound.play()
		}
	}

	function validateAnswer (e) {
		const correct = e.target.textContent === questions[current - 1].correctAnswer

		e.target.parentNode.classList.add(correct ? 'shake-left-right' : 'vibrate')
		e.target.classList.add(correct ? 'correctAnswer' : 'wrongAnswer')

		document.querySelectorAll(`.answer-${current}`).forEach(answer => {
			answer.disabled = true
			if (!correct && answer.textContent === questions[current - 1].correctAnswer) {
				answer.parentNode.classList.add('shake-left-right')
				answer.classList.add('correctAnswer')
			}
		})

		answerSound(correct)
		setQuestions(questions => {
			questions[current - 1].userAnswer = correct ? 1 : -1
			return questions
		})

		if (queries.infinitymode) {
			if (correct) {
				if (scoreInfinity[0] === scoreInfinity[1]) getAnotherQuestions()
				else setScoreInfinity(scoreInfinity => [scoreInfinity[0] + 1, scoreInfinity[1]])
			} else {
				if (wildCards.lives > 0) {
					if (scoreInfinity[0] === scoreInfinity[1]) getAnotherQuestions()
					else {
						subtractWildcard('lives')
						setScoreInfinity(scoreInfinity => [scoreInfinity[0] + 1, scoreInfinity[1]])
					}
				} else return setWin(-1)
			}
		} else {
			if (!correct) {
				if (wildCards.lives > 0) {
					subtractWildcard('lives')
					if (current === Number(queries.questions)) return setWin(1)
				} else return setWin(-1)
			} else if (current === Number(queries.questions)) return setWin(1)
		}

		setTimeout(() => {
			if (queries.infinitymode && correct && scoreInfinity[0] === scoreInfinity[1]) {
				changueCurrent(1, true)
			} else changueCurrent(current + 1, true)
			setScore(score => score + 1)
			setTime(Number(queries.time))
		}, 900)
	}

	function wilcardSkip () {
		if (wildCards.skip < 1 && !queries.infinitymode && current !== score) return

		if (wildCards.skip > 0 && current === Number(queries.questions)) {
			if (queries.infinitymode && scoreInfinity[0] === scoreInfinity[1]) return getAnotherQuestions()
			else setWin(1)
		}

		answerSound(true)
		subtractWildcard('skip')
		if (current === Number(queries.questions) && !queries.infinitymode) {
			clickAnswers(true, false)
		} else clickAnswers()

		if (!queries.infinitymode) {
			setQuestions(questions => {
				questions[current - 1].userAnswer = 2
				return questions
			})
		}
	}

	function wilcardFifty () {
		if (wildCards.half < 1) {
			if (queries.infinitymode && scoreInfinity[0] === scoreInfinity[1]) return getAnotherQuestions()
			else if (current !== score) return
		}

		subtractWildcard('half')
		const answers = document.querySelectorAll(`.answer-${current}`)
		const correct = questions[current - 1].correctAnswer
		const wrongs = [...answers].filter(answer => answer.textContent !== correct)

		wrongs.sort(() => Math.random() - 0.5).slice(0, 2).forEach(wrong => {
			wrong.classList.add('wrongAnswer')
			wrong.parentNode.classList.add('vibrate')
			wrong.disabled = true
		})
	}

	return (
		<>
			<div className='fixed max-w-xl md:max-w-2xl w-[85%] mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<QuestionsNav score={score} scoreInfinity={scoreInfinity} changueCurrent={changueCurrent} questions={questions} current={current} />
				<QuestionSlider questions={questions} loading={loading} error={error} validateAnswer={validateAnswer} />
			</div>
			<GameOver win={win} />
			<Wildcards win={win} wilcardSkip={wilcardSkip} wilcardFifty={wilcardFifty} />
			{
				queries.timemode && <div className={`bg-white flex items-center justify-center w-14 aspect-square absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full text-2xl text-slate-900 font-medium ${time < 6 && win >= 0 ? 'pulse_animation' : ''}`}>
					{time}
				</div>
			}
		</>
	)
}
// 272
