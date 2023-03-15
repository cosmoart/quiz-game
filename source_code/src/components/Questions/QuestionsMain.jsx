import { useContext, useEffect, useState } from 'react'
import Wildcards from './Wildcards'
import GameOver from '../Play/GameOver'
import QuestionsNavbar from './QuestionsNavbar'
import categories from '@/assets/categories.json'
import { WildcardsContext } from '@/context/WildcardsContext'
import getQuestions from '@/helpers/getQuestions'
import QuestionSlider from './QuestionSlider'
import { QueriesContext } from '@/context/QueriesContext'
import playSound from '@/helpers/playSound'

export default function Questions ({ ques }) {
	const [questions, setQuestions] = useState(ques)
	const { queries } = useContext(QueriesContext)
	const { wildCards, subtractWildcard } = useContext(WildcardsContext)
	const [win, setWin] = useState(0)
	const [score, setScore] = useState(1)
	const [current, setCurrent] = useState(1)
	const [time, setTime] = useState(Number(queries.time))

	const [loading, setloading] = useState(false)
	const [error, setError] = useState(false)
	const [scoreInfinity, setScoreInfinity] = useState([1, 5])

	useEffect(() => {
		if (win !== 0 || !queries.timemode) return
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
				playSound('wrong_answer', 0.3)
			} else {
				subtractWildcard('lives')
				clickAnswers(true, true, true)
				playSound('correct_answer', 0.3)
			}
		}
	}, [time])

	useEffect(() => {
		const color = categories.find(cat => cat.name === questions[current - 1]?.topic)?.color
		document.body.style.backgroundColor = color
	}, [current])

	function getAnotherQuestions () {
		setloading(true)
		changueCurrent(1)
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

	function clickAnswers (correct = true, addScore = true, color = false) {
		if (addScore) {
			setTimeout(() => {
				if (queries.infinitymode) setScoreInfinity(scoreInfinity => [scoreInfinity[0] + 1, scoreInfinity[1]])
				setTime(Number(queries.time))
				setQuestions(questions => {
					questions[current - 1].userAnswer = correct ? (color ? 2 : 1) : -1
					return questions
				})
				setScore(score => score + 1)
				changueCurrent(current + 1)
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

	function changueCurrent (number) {
		if (number > Number(queries.questions)) return

		document.querySelectorAll('[id^="question-"]').forEach(question => {
			question.classList.remove('slide-left', 'slide-right')
			if (question.id !== `question-${number}`) {
				question.classList.add(question.id.slice(-1) < number ? 'slide-left' : 'slide-right')
			}
		})

		setCurrent(number)
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

		playSound(correct ? 'correct_answer' : 'wrong_answer', 0.3)
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
				changueCurrent(1)
			} else changueCurrent(current + 1)
			setScore(score => score + 1)
			setTime(Number(queries.time))
		}, 900)
	}

	return (
		<>
			<div className='fixed max-w-xl md:max-w-2xl w-[85%] mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<QuestionsNavbar score={score} scoreInfinity={scoreInfinity} changueCurrent={changueCurrent} questions={questions} current={current} />
				<QuestionSlider questions={questions} loading={loading} error={error} validateAnswer={validateAnswer} />
			</div>
			{win !== 0 && <GameOver win={win} />}
			<Wildcards win={win} setWin={setWin} current={current} score={score} questions={questions} setQuestions={setQuestions} clickAnswers={clickAnswers} scoreInfinity={scoreInfinity} getAnotherQuestions={getAnotherQuestions} />
			{
				queries.timemode && <div className={`bg-white flex items-center justify-center w-14 aspect-square absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full text-2xl text-slate-900 font-medium ${time < 6 && win >= 0 ? 'pulse_animation' : ''}`}>
					{time}
				</div>
			}
		</>
	)
}
// 272
