import { useEffect, useState } from 'react'
import getQuestions from '@/helpers/getQuestions'
import Image from 'next/image'
import Wildcards from './Wildcards'
import GameOver from './GameOver'
import categories from '@/assets/categories.json'

export default function Questions ({ queries, setQuestions, questions }) {
	const [win, setWin] = useState(0)
	const [loading, setloading] = useState(false)
	const [error, setError] = useState(false)

	const [timeQ, setTimeQ] = useState(Number(queries.time))
	const [score, setScore] = useState(1)
	const [scoreInfinity, setScoreInfinity] = useState([1, 5])

	const [current, setCurrent] = useState(1)
	const [wildCards, setWildCards] = useState({
		skip: 1,
		half: 1,
		doubled: 1,
		lives: 1
	})

	function getAnotherQuestions () {
		setloading(true)
		setCurrent(1)
		getQuestions(queries.categories, 5)
			.then((q) => {
				setQuestions(q)
				console.log(q)
			}).catch((err) => {
				setError(err)
			}).finally(() => {
				setScoreInfinity(scoreInfinity => [scoreInfinity[0], scoreInfinity[1] + 5])
				setloading(false)
				console.log(current)
				setCurrent(1)
				console.log(current)
			})
	}

	useEffect(() => {
		if (!queries.timemode) return
		const timeInterva = setInterval(() => {
			setTimeQ(timeQ => timeQ > 0 ? timeQ - 1 : timeQ)
		}, 1000)
		return () => clearInterval(timeInterva)
	}, [queries.timemode])

	useEffect(() => {
		if (timeQ < 1) {
			if (wildCards.lives < 1) {
				document.querySelectorAll(`.answer-${current}`).forEach(answer => {
					answer.disabled = true
					if (answer.textContent === questions[current - 1].correctAnswer) {
						answer.classList.add('correctAnswer')
					}
				})
				setWin(-1)
			} else {
				setWildCards(wildCards => ({ ...wildCards, lives: wildCards.lives - 1 }))
				clickCorrectAnswer()
			}
		}
	}, [timeQ])

	// Changue background color and image when the question changes
	useEffect(() => {
		const color = categories.find(cat => cat.name === questions[current - 1]?.topic)?.color
		document.body.style.backgroundColor = color
	}, [current, questions])

	function clickCorrectAnswer () {
		setScore(score => score + 1)
		setTimeQ(Number(queries.time))

		document.querySelectorAll(`.answer-${current}`).forEach(answer => {
			answer.disabled = true
			if (answer.textContent === questions[current - 1].correctAnswer) {
				answerSound(true)
				answer.classList.add('correctAnswer')
				answer.parentNode.classList.add('shake-left-right')
			}
		})

		setQuestions(questions => {
			questions[current - 1].userAnswer = 2
			return questions
		})

		setTimeout(() => {
			changueCurrent(current + 1, true)
		}, 1000)
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

		answerSound(correct)

		e.target.parentNode.classList.add(correct ? 'shake-left-right' : 'vibrate')
		e.target.classList.add(correct ? 'correctAnswer' : 'wrongAnswer')

		document.querySelectorAll(`.answer-${current}`).forEach(answer => {
			answer.disabled = true
			if (!correct && answer.textContent === questions[current - 1].correctAnswer) {
				answer.classList.add('correctAnswer')
				answer.parentNode.classList.add('shake-left-right')
			}
		})

		setQuestions(questions => {
			questions[current - 1].userAnswer = correct ? 1 : -1
			return questions
		})

		if (queries.infinitymode) {
			if (correct || wildCards.lives > 0) setScoreInfinity(scoreInfinity => [scoreInfinity[0] + 1, scoreInfinity[1]])
			if (scoreInfinity[0] === scoreInfinity[1]) {
				if (correct) {
					getAnotherQuestions()
				} else if (wildCards.lives < 1) setWin(-1)
				else {
					setWildCards(wildCards => {
						wildCards.lives = wildCards.lives > 0 ? wildCards.lives - 1 : wildCards.lives
						wildCards
					})
					if (current === Number(queries.questions)) setWin(1)
				}
			}
		} else {
			if (!correct) {
				if (wildCards.lives < 1) return setWin(-1)
				else {
					setWildCards(wildCards => {
						wildCards.lives = wildCards.lives > 0 ? wildCards.lives - 1 : wildCards.lives
						return wildCards
					})
					if (current === Number(queries.questions)) return setWin(1)
				}
			} else if (current === Number(queries.questions)) return setWin(1)
		}

		setTimeQ(Number(queries.time))
		setScore(score => score + 1)
		setTimeout(() => {
			if (queries.infinitymode && correct && scoreInfinity[0] === scoreInfinity[1]) {
				console.log(current)
				changueCurrent(1, true)
			} else changueCurrent(current + 1, true)
		}, 1000)
	}

	// Wilcards

	function wilcardSkip () {
		if (wildCards.skip < 1 || current !== score) return
		if (wildCards.skip > 0 && current === Number(queries.questions)) return setWin(1)

		setWildCards(wildCards => ({ ...wildCards, skip: wildCards.skip - 1 }))
		clickCorrectAnswer()
	}

	function wilcardFifty () {
		if (wildCards.half < 1 || current !== score) return
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
										<button onClick={() => changueCurrent(i + 1)} className={`w-8 h-8 flex items-center justify-center pt-[2px] font-medium transition-all rounded-full text-center text-sm ${i + 1 === score && 'bg-white text-blue-500'} ${i + 1 <= score ? 'cursor-pointer hover:scale-105' : 'bg-slate-600 hover:cursor-auto'} ${questions[i].userAnswer === 1 && 'bg-green-500 !text-white'} ${questions[i].userAnswer === -1 && 'bg-red-500 !text-white'}  ${questions[i].userAnswer === 2 && 'bg-blue-500 !text-white'} ${i + 1 === current && 'outline outline-offset-2 hover:outline-offset-4 outline-blue-500'} `}>{i + 1}</button>
									</li>
								))
							}
						</ol>
				}
				{
					!loading
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
															{answer}
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
						: <div className='flex items-center justify-center h-1/2'>
							Loading next questions...
						</div>
				}
			</div>
			<GameOver win={win} />
			<Wildcards wildCards={wildCards} wilcardSkip={wilcardSkip} wilcardFifty={wilcardFifty} win={win} />
			{
				queries.timemode && <div className={`bg-white flex items-center justify-center w-14 aspect-square absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full text-2xl text-slate-900 font-medium ${timeQ < 6 && win >= 0 ? 'pulse_animation' : ''}`}>
					{timeQ}
				</div>
			}
		</>
	)
}
