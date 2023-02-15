import { useEffect, useState } from 'react';
import Image from 'next/image'
import Wildcards from './Wildcards';
import GameOver from './GameOver';
import categories from '@/assets/categories.json'

export default function Questions({ queries, setQuestions, questions }) {
	const [win, setWin] = useState(0);
	const [timeQ, setTimeQ] = useState(Number(queries.time));
	const [score, setScore] = useState(1);
	const [current, setCurrent] = useState(1);
	const [wildCards, setWildCards] = useState({
		skip: 1,
		half: 1,
		doubled: 1,
		lives: 1,
	});

	useEffect(() => {
		if (!queries.timemode) return;
		const timeInterva = setInterval(() => {
			setTimeQ(timeQ => timeQ > 0 ? timeQ - 1 : timeQ);
		}, 1000);
		return () => clearInterval(timeInterva);
	}, [queries.timemode]);

	useEffect(() => {
		if (timeQ < 1) {
			if (wildCards.lives < 1) setWin(-1)
			else {
				setWildCards(wildCards => ({ ...wildCards, lives: wildCards.lives - 1 }));
				setTimeQ(Number(queries.time));
				setScore(score => score + 1);
				setCurrent(current => current + 1);
			}
		}
	}, [timeQ]);

	// Changue background color and image when the question changes
	useEffect(() => {
		let color = categories.find(cat => cat.name === questions[current - 1]?.topic).color
		document.body.style.backgroundColor = color;
		// document.body.style.backgroundImage = `url(categories-bg/${questions[0] && questions[current - 1].topic}.webp)`;
		document.body.style.backgroundImage = "url(https://garticphone.com/images/textura.png)"
		document.body.style.backgroundSize = "cover";
	}, [current, questions]);

	function changueCurrent(number, avoidState) {
		if (number > score && !avoidState) return

		document.querySelectorAll('[id^="question-"]').forEach(question => {
			question.classList.remove("slide-left", "slide-right")
			if (question.id !== `question-${number}`) {
				question.classList.add(question.id.slice(-1) < number ? "slide-left" : "slide-right")
			}
		});

		setCurrent(number)
	}

	function validateAnswer(e) {
		let correct = e.target.textContent === questions[current - 1].correctAnswer;

		let sound = document.getElementById(correct ? "correct_sound" : "wrong_sound");
		sound.volume = 0.3;
		sound.play();

		e.target.parentNode.classList.add(correct ? "shake-left-right" : "vibrate");
		e.target.classList.add(correct ? "correctAnswer" : "wrongAnswer")

		document.querySelectorAll(`.answer-${current}`).forEach(answer => {
			answer.disabled = true;
			if (!correct && answer.textContent === questions[current - 1].correctAnswer) {
				answer.classList.add("correctAnswer")
				answer.parentNode.classList.add("shake-left-right")
			}
		});

		setQuestions(questions => {
			questions[current - 1].userAnswer = correct ? 1 : -1;
			return questions;
		});

		if (!correct) {
			console.log(wildCards.lives < 1);
			if (wildCards.lives < 1) return setWin(-1);
			else {
				setWildCards(wildCards => {
					wildCards.lives = wildCards.lives > 0 ? wildCards.lives - 1 : wildCards.lives;
					return wildCards;
				});
			}
		} else if (current === Number(queries.questions)) return setWin(1);

		setTimeQ(Number(queries.time));
		setScore(score => score + 1);
		setTimeout(() => {
			changueCurrent(current + 1, true);
		}, 1000);
	}

	// Wilcards

	function wilcardSkip() {
		if (wildCards.skip < 1 || current !== score) return
		setWildCards(wildCards => ({ ...wildCards, skip: wildCards.skip - 1 }));
		document.querySelectorAll(`.answer-${current}`).forEach(answer => {
			answer.disabled = true;
			if (answer.textContent === questions[current - 1].correctAnswer) {
				answer.classList.add("correctAnswer")
				answer.parentNode.classList.add("shake-left-right")
			}
		});
		setScore(score => score + 1);
		setQuestions(questions => {
			questions[current - 1].userAnswer = 2;
			return questions;
		});
		setTimeQ(Number(queries.time));
		setTimeout(() => {
			changueCurrent(current + 1, true);
		}, 1000);
	}

	function wilcardFifty() {
		if (wildCards.half < 1 || current !== score) return
		setWildCards(wildCards => ({ ...wildCards, half: wildCards.half - 1 }));
		let answers = document.querySelectorAll(`.answer-${current}`);
		let correct = questions[current - 1].correctAnswer;
		let wrongs = [...answers].filter(answer => answer.textContent !== correct);

		wrongs.sort(() => Math.random() - 0.5).slice(0, 2).forEach(wrong => {
			wrong.classList.add("wrongAnswer");
			wrong.parentNode.classList.add("vibrate");
			wrong.disabled = true;
		});
	}

	return (
		<>
			<audio src="/sounds/correct_answer.mp3" id="correct_sound" className='hidden' />
			<audio src="/sounds/wrong_answer.mp3" id="wrong_sound" className='hidden' />
			<div className='fixed max-w-xl md:max-w-2xl w-[85%] mx-auto  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				{
					queries.infinitymode
						? <div className='mx-auto bg-white text-black rounded-full z-10 w-14 grid place-items-center aspect-square mb-4 text-xl font-medium'>
							{current}
						</div>
						: <ol className="flex gap-5 flex-wrap mb-5 md:mb-10 justify-between items-center w-full text-white">
							{
								[...Array(parseInt(queries.questions))].map((_, i) => (
									<li key={i}>
										<button onClick={() => changueCurrent(i + 1)} className={`w-8 h-8 flex items-center justify-center pt-[2px] font-medium transition-all rounded-full text-center text-sm ${i + 1 === score && "bg-white text-blue-500"} ${i + 1 <= score ? "cursor-pointer hover:scale-105" : "bg-slate-600 hover:cursor-auto"} ${questions[i].userAnswer === 1 && "bg-green-400 !text-white"} ${questions[i].userAnswer === -1 && "bg-red-500 !text-white"}  ${questions[i].userAnswer === 2 && "bg-blue-500 !text-white"} ${i + 1 === current && "outline outline-offset-2 hover:outline-offset-4 outline-blue-500"} `}>{i + 1}</button>
									</li>
								))
							}
						</ol>
				}
				<main className='relative max-w-2xl min-h-[28rem] md:min-h-[16rem] mx-auto overflow-hidden h-1/2'>
					{
						questions.map((question, i) => {
							return (
								<div key={question.correctAnswer + i} className={`transition-all duration-500 ${i === 0 ? "" : "slide-right"} absolute text-center w-full`} id={"question-" + (i + 1)}>
									<p className='rounded-md h-[6.5rem] flex justify-center items-center bg-blue-500 px-10 py-6 text-white text-xl font-semibold block mb-3'>
										{question.question}
									</p>

									<ul className='md:columns-2 mt-4 '>
										{question.answers.map((answer, j) => (
											<li key={j + answer} className="relative">
												<button className={`${"answer-" + (i + 1)} peer btn-primary w-full shadow-sm py-3 px-5 rounded mb-6`} onClick={validateAnswer}>
													{answer}
												</button >

												<Image className='absolute pointer-events-none left-2 top-1 peer-disabled:translate-y-0 peer-hover:translate-y-[0.25em] peer-active:translate-y-[0.75em] transition-transform z-20 invert' src={`/letters/letter-${["a", "b", "c", "d"][j]}.svg`} width={40} height={40} alt={`Question ${j + 1}]}`} />
											</li>
										))}
									</ul>

								</div>
							)
						})
					}
				</main>
			</div>
			<GameOver win={win} />
			<Wildcards wildCards={wildCards} wilcardSkip={wilcardSkip} wilcardFifty={wilcardFifty} win={win} />
			{
				queries.timemode && <div className={`bg-white flex items-center justify-center w-14 aspect-square absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full text-2xl text-slate-900 font-medium ${timeQ < 6 && win >= 0 ? "pulse_animation" : ""}`}>
					{timeQ}
				</div>
			}
		</>
	)
}