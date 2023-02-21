import { useEffect, useState } from 'react'
import getQuestions from '@/helpers/getQuestions'
import Image from 'next/image'
import Wildcards from './Wildcards'
import GameOver from './GameOver'
import categories from '@/assets/categories.json'

export default function Questions ({ queries, setQuestions, questions }) {
	const [win, setWin] = useState(0)
	const [score, setScore] = useState(1)
	const [current, setCurrent] = useState(1)
	const [time, setTime] = useState(Number(queries.time))
	const [wildCards, setWildCards] = useState({
		skip: 1,
		half: 1,
		lives: 1
	})

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
				setWildCards(wildCards => ({ ...wildCards, lives: wildCards.lives - 1 }))
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

	function answerSound (correct) {
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
				answer.classList.add('correctAnswer')
				answer.parentNode.classList.add('shake-left-right')
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
						setWildCards(wildCards => ({ ...wildCards, lives: wildCards.lives - 1 }))
						setScoreInfinity(scoreInfinity => [scoreInfinity[0] + 1, scoreInfinity[1]])
					}
				} else return setWin(-1)
			}
		} else {
			if (!correct) {
				if (wildCards.lives > 0) {
					setWildCards(wildCards => {
						wildCards.lives = wildCards.lives > 0 ? wildCards.lives - 1 : wildCards.lives
						return wildCards
					})
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

	// Wilcards

	function wilcardSkip () {
		if (wildCards.skip < 1 && !queries.infinitymode && current !== score) return

		if (wildCards.skip > 0 && current === Number(queries.questions)) {
			if (queries.infinitymode && scoreInfinity[0] === scoreInfinity[1]) return getAnotherQuestions()
			else setWin(1)
		}

		answerSound(true)
		setWildCards(wildCards => ({ ...wildCards, skip: wildCards.skip - 1 }))
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

		setWildCards(wildCards => ({ ...wildCards, half: wildCards.half - 1 }))
		const answers = document.querySelectorAll(`.answer-${current}`)
		const correct = questions[current - 1].correctAnswer
		const wrongs = [...answers].filter(answer => answer.textContent !== correct)

		wrongs.sort(() => Math.random() - 0.5).slice(0, 2).forEach(wrong => {
			wrong.classList.add('wrongAnswer')
			wrong.parentNode.classList.add('vibrate')
			wrong.disabled = true
		})
	}

	function buttonBg (i) {
		let bg = 'bg-slate-600 hover:cursor-auto'
		if (i + 1 === score) bg = 'bg-white text-blue-500'
		if (questions[i].userAnswer === 1) bg = 'bg-green-500 !text-white'
		if (questions[i].userAnswer === -1) bg = 'bg-red-500 !text-white'
		if (questions[i].userAnswer === 2) bg = 'bg-blue-500 !text-white'
		if (i + 1 <= score) bg += ' cursor-pointer hover:scale-105'
		if (i + 1 === current) bg += ' outline outline-offset-2 hover:outline-offset-4 outline-blue-500'
		return bg
	}

	return (
		<>
			<div className='fixed max-w-xl md:max-w-2xl w-[85%] mx-auto  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				{
					queries.infinitymode
						? <div className='mx-auto bg-white text-black rounded-full z-10 w-14 grid place-items-center aspect-square mb-4 text-xl font-medium'>
							{scoreInfinity[0]}
						</div>
						: <ol className='progressBar flex relative gap-5 overflow-auto sm:overflow-visible p-2 sm:p-0 mb-5 md:mb-10 justify-between items-center w-full text-white after:absolute after:top-1/2 after:-z-10 after:transition-all after:duration-700 after:rounded-full after:-translate-y-1/2 after:h-[6px] after:bg-blue-500' style={{ '--segments': Number(queries.questions) - 1, '--current': score - 1 }}>
							{
								[...Array(parseInt(queries.questions))].map((_, i) => (
									<li key={i}>
										<button onClick={() => changueCurrent(i + 1)} className={`w-8 h-8 flex items-center justify-center pt-[2px] font-medium transition-all rounded-full text-center text-sm ${buttonBg(i)}`}>{i + 1}</button>
									</li>
								))
							}
						</ol>
				}
				{
					!loading && !error
						? <main className='relative max-w-2xl min-h-[28rem] md:min-h-[16rem] mx-auto overflow-hidden h-1/2'>
							{
								questions.map((question, i) => {
									return (
										<div key={question.correctAnswer + i} className={`transition-all duration-500 ${i === 0 ? '' : 'slide-right'} absolute text-center w-full`} id={'question-' + (i + 1)}>
											<p className='rounded-md h-32 md:h-[6.5rem] flex justify-center items-center bg-blue-500 px-10 py-6 text-white text-xl font-semibold mb-3'>
												{question.question}
											</p>

											<ul className='md:columns-2 mt-4 '>
												{question.answers.map((answer, j) => (
													<li key={j + answer} className="relative">
														<button className={`${'answer-' + (i + 1)} peer btn-primary w-full shadow-sm py-3 px-5 rounded mb-6`} onClick={validateAnswer}>
															{answer || '---'}
														</button >

														<Image className='absolute pointer-events-none left-2 top-1 peer-disabled:translate-y-0 peer-hover:translate-y-[0.25em] peer-active:translate-y-[0.75em] transition-transform z-20 invert' src={`/letters/letter-${['a', 'b', 'c', 'd'][j]}.svg`} width={40} height={40} alt={`Question ${j + 1}]}`} />
													</li>
												))}
											</ul>

										</div>
									)
								})
							}
						</main>
						: <div className='flex h-32 md:h-[6.5rem] items-center justify-center rounded-md bg-blue-500 px-10 py-6 text-white text-xl font-semibold'>
							Loading next questions...
						</div>
				}
			</div>
			<GameOver win={win} />
			<Wildcards wildCards={wildCards} wilcardSkip={wilcardSkip} wilcardFifty={wilcardFifty} win={win} />
			{
				queries.timemode && <div className={`bg-white flex items-center justify-center w-14 aspect-square absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full text-2xl text-slate-900 font-medium ${time < 6 && win >= 0 ? 'pulse_animation' : ''}`}>
					{time}
				</div>
			}
		</>
	)
}
// 272
