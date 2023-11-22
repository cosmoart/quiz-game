import { useEffect, useState } from 'react'
import Wildcards from './Wildcards'
import GameOver from '../Play/GameOver'
import QuestionsNavbar from './QuestionsNavbar'
import QuestionSlider from './QuestionSlider'

import categories from '@/assets/categories.json'
import playSound from '@/helpers/playSound'
import { useBoundStore } from '@/store/useBoundStore'

export default function Questions () {
	const { questions, loading, loadingInfinity, currentQuestion, setCurrentQuestion, setUserAnswer, win, score, setWin, setScore, wildCards, useLivesCard, queries, getQuestions } = useBoundStore(state => state)
	const [time, setTime] = useState(Number(queries.time))

	useEffect(() => {
		const color = categories.find(cat => cat.name.toLowerCase() === questions[currentQuestion - 1]?.topic.toLowerCase())?.color
		color && (document.body.style.backgroundColor = color)

		function shortcuts (e) {
			if (!queries.infinitymode) {
				if (e.key === 'ArrowLeft' && currentQuestion > 1) changueCurrent(currentQuestion - 1)
				if (e.key === 'ArrowRight' && currentQuestion < score) changueCurrent(currentQuestion + 1)
			}

			if (e.key === 'a' || e.key === 'b' || e.key === 'c' || e.key === 'd') {
				const answer = ['a', 'b', 'c', 'd'].indexOf(e.key)
				if (answer !== -1) document.querySelector(`.answers-${queries.infinitymode ? currentQuestion : score} .answer-${answer + 1}`)?.click()
			}
		}

		document.addEventListener('keydown', shortcuts)
		return () => document.removeEventListener('keydown', shortcuts)
	}, [currentQuestion, score])

	useEffect(() => {
		if (win !== undefined || !queries.timemode || loading || loadingInfinity) return
		const timeInterval = setInterval(() => setTime(time => time > 0 ? time - 1 : time), 1000)
		return () => clearInterval(timeInterval)
	}, [queries.timemode, win, loading, loadingInfinity])

	useEffect(() => {
		if (win !== undefined || time > 0) return

		if (wildCards.lives < 1) {
			clickCorrectAnswer()
			setUserAnswer(score - 1, -1)
			playSound('wrong_answer', 0.3)
			setWin(false)
		} else {
			if (queries.infinitymode) {
				if (score !== 1 && score % 5 === 0) {
					clickCorrectAnswer()
					getAnotherQuestions()
				} else clickCorrectAnswer(true)
			} else {
				if (score === queries.questions) {
					setWin(true)
					clickCorrectAnswer()
				} else clickCorrectAnswer(true)
			}

			setUserAnswer(score - 1, 2)
			useLivesCard()
			playSound('correct_answer', 0.3)
		}
	}, [time])

	function getAnotherQuestions () {
		setTimeout(() => {
			setTime(Number(queries.time))
			changueCurrent(1)
			setScore(score + 1)
			const topics = categories.filter(category => queries.categories.find(cat => cat === category.id)).map(cat => cat.name)
			getQuestions(topics, 5, true)
		}, 1000)
	}

	function clickCorrectAnswer (addScore = false) {
		if (addScore) {
			setTimeout(() => {
				setScore(score + 1)
				setTime(Number(queries.time))
				setUserAnswer(score - 1, 1)
				changueCurrent(score + 1)
			}, 1000)
		}

		document.querySelectorAll(`.answers-${score} button`).forEach(answer => {
			answer.disabled = true
			if (answer.textContent === questions[score - 1].correctAnswer) {
				answer.classList.add('correctAnswer')
				answer.parentNode.classList.add('shake-left-right')
			}
		})
	}

	function changueCurrent (number) {
		if (number > questions.lenght || number < 1) return
		document.querySelectorAll('[id^="question-"]').forEach(question => {
			question.classList.remove('slide-left', 'slide-right')
			if (question.id !== `question-${number}`) {
				question.classList.add(Number(question.id.replace('question-', '')) < number ? 'slide-left' : 'slide-right')
			}
		})
		setCurrentQuestion(number)
	}

	return (
		<>
			<div className='fixed max-w-xl md:max-w-2xl w-[85%] mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<QuestionsNavbar changueCurrent={changueCurrent} />
				<QuestionSlider changueCurrent={changueCurrent} setTime={setTime} getAnotherQuestions={getAnotherQuestions} />
			</div>

			{win !== undefined && <GameOver />}
			<Wildcards />

			{
				queries.timemode && <div className={`bg-white flex items-center justify-center w-14 aspect-square absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full text-2xl text-slate-900 font-medium ${time < 6 && win === undefined ? 'pulse_animation' : ''}`}>
					{time}
					<svg className='countdown absolute top-0 left-0 w-full rotate-180 overflow-visible h-full'>
						<circle className={`stroke-blue-500 transition-all duration-1000 ease-linear ${time < 6 && win === undefined ? ' stroke-red-500' : ''}`} r="28" cx="27" cy="27" style={{ strokeDashoffset: 174 / queries.time * time }}></circle>
					</svg>
				</div>
			}
		</>
	)
}
