import Image from 'next/image'
import { useEffect, useState } from 'react';
import categories from '@/assets/categories.json'

export default function Question({ questions, queries }) {
	const [score, setScore] = useState(1);
	const [current, setCurrent] = useState(1);

	useEffect(() => {
		let color;
		if (questions.length > 0) {
			color = categories.find(cat => cat.name === questions[current - 1]?.topic).color
		}
		document.body.style.backgroundColor = color;
		document.body.style.backgroundImage = `url(${questions[current - 1].topic}.png)`;

	}, [current, questions]);

	function changueCurrent(number) {
		if (number <= score) {
			document.querySelectorAll('[id^="question-"]').forEach(question => {
				question.classList.remove("slide-left", "slide-right")
				if (question.id !== `question-${number}`) {
					question.classList.add(question.id.slice(-1) < number ? "slide-left" : "slide-right")
				}
			});
			setCurrent(number)
		}
	}

	function validate(e, answer) {
		if (answer === questions[current - 1].correct) {
			let correctSound = new Audio('/sounds/correct_answer.mp3');

			e.target.style.backgroundColor = "#22c55e";
			e.target.classList.add("shake-left-right");
			correctSound.volume = 0.3;
			correctSound.play();
		} else {
			let wrongSound = new Audio('/sounds/wrong_answer.mp3');

			e.target.style.backgroundColor = "#e11d48";
			e.target.classList.add("vibrate");
			document.querySelectorAll(`.answer-${current}`).forEach(answer => {
				answer.disabled = true;
				if (answer.textContent === questions[current - 1].correct) {
					answer.style.backgroundColor = "#22c55e";
					answer.classList.add("shake-left-right");
				}
			});
			wrongSound.volume = 0.3;
			wrongSound.play();
		}
		setScore(score + 1);
	}

	return (
		<div className='max-w-2xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<ol className="flex gap-5 mb-10 justify-between items-center w-full text-white">
				{
					queries.questions && [...Array(parseInt(queries.questions))].map((_, i) => (
						<li key={i} onClick={() => changueCurrent(i + 1)} className={`w-8 h-8 flex items-center justify-center pt-[2px] font-medium transition-all rounded-full text-center text-sm ${i + 1 === score ? "bg-white text-blue-500 hover:scale-105" : "bg-slate-600"} ${i + 1 <= score ? "cursor-pointer" : ""} ${i + 1 < score ? "bg-green-400" : ""} ${i + 1 === current ? "outline outline-offset-2 hover:outline-offset-4 outline-blue-500" : ""} `}>
							{i + 1}
						</li>
					))
				}
			</ol>
			<main className='relative w-screen max-w-2xl min-h-[20rem] mx-auto overflow-hidden h-1/2'>
				{
					questions && questions.map((question, i) => {
						return (
							<div key={question.correct + i} className={`transition-all duration-500 ${i === 0 ? "" : "slide-right"} absolute text-center w-full`} id={"question-" + (i + 1)}>
								<p className='rounded-md bg-blue-500 px-10 py-6 text-white text-xl font-semibold block mb-3'>
									{question.question}
								</p>

								<ul className='md:columns-2 mt-4'>
									{question.answers && question.answers.map((answer, j) => (
										<li key={j + answer} className="relative">
											<button className={`${"answer-" + (i + 1)} peer btn-primary w-full shadow-sm py-3 px-5 rounded mb-6`} onClick={(e) => validate(e, answer)}>
												{answer}
											</button >

											<Image className='absolute pointer-events-none left-2 top-1 peer-hover:translate-y-[0.25em] peer-active:translate-y-[0.75em] transition-transform z-20 invert' src={`/letters/letter-${["a", "b", "c", "d"][j]}.svg`} width={40} height={40} alt={`Question ${j + 1}]}`} />
										</li>
									))}
								</ul>

							</div>
						)
					})
				}
			</main>
		</div>
	)
}