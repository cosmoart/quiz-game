import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import getQuestion from "../../helpers/getQuestion"
import categories from '@/assets/categories.json'
import Footer from '@/components/Footer'

import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Play() {
	const router = useRouter()
	const [score, setScore] = useState(1);
	const [current, setCurrent] = useState(1);

	const [questions, setQuestions] = useState([]);
	const [queries, setQueries] = useState({});

	const correctSound = useRef(null);
	const wrongSound = useRef(null);

	useEffect(() => {
		getQuestion().then((question) => setQuestions(question));
		setQueries({
			questions: router.query.questions || 10,
			time: router.query.time || 20,
			mode: router.query.mode || 'classic',
			categories: router.query.categories || null
		});
	}, [router]);

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
			e.target.style.backgroundColor = "#22c55e";
			e.target.classList.add("shake-left-right");
			correctSound.current.volume = 0.3;
			correctSound.current.play();
		} else {
			e.target.style.backgroundColor = "#e11d48";
			e.target.classList.add("vibrate");
			document.querySelectorAll(`.answer-${current}`).forEach(answer => {
				answer.disabled = true;
				if (answer.textContent === questions[current - 1].correct) {
					answer.style.backgroundColor = "#22c55e";
					answer.classList.add("shake-left-right");
				}
			});
			wrongSound.current.volume = 0.3;
			wrongSound.current.play();
		}
		setScore(score + 1);
	}

	useEffect(() => {
		let color;
		if (questions.length > 0) {
			color = categories.find(cat => cat.name === questions[current - 1]?.topic).color
		}
		document.body.style.backgroundColor = color;
	}, [current, questions]);

	useEffect(() => {
		window.onbeforeunload = () => "Your game will be lost!";
		document.body.style.backgroundImage = "url('/pattern2.png')";
	}, []);

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
				<meta name="description" content="TODO" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<audio ref={correctSound} src="sounds/correct_answer_sound.mp3" />
			<audio ref={wrongSound} src="sounds/wrong_answer_sound.mp3" />

			<nav>
				<ul className='flex gap-3 p-3'>
					<li>
						<Link href="/" className='w-10'>
							<BiArrowBack color='#0f172a' className='text-4xl hover:scale-105 transition-all  p-1 bg-white rounded' title='Go back' />
						</Link>
					</li>
					<li>
						<button className='hover:scale-105 transition-all p-1 bg-white rounded' onClick={() => document.getElementById("newGameDialog").showModal()}>
							<BsArrowRepeat className='text-[27px]' color='#0f172a' title='New game' />
						</button>
					</li>
				</ul>
			</nav>

			<aside className='absolute left-5 top-1/2 -translate-y-1/2'>
				<div className='flex'>
					<div>
						q: {queries.questions}
					</div>
					<div>
						t: {queries.time}
					</div>
					<div>
						m: {queries.mode}
					</div>
				</div>
				<div>
					categories:
					<div className='grid grid-cols-2 gap-2'>
						{queries.categories && queries.categories.split(",").map(category => {
							let cat = categories.find(cat => cat.id === category)
							return <Image key={category} title={cat.name} alt={cat.name}
								className="p-1 rounded"
								style={{ backgroundColor: cat.color }}
								src={`/categories/${cat.name.toLowerCase()}.svg`}
								width={33} height={33} />
						})
						}
					</div>
				</div>
			</aside>


			<div className='max-w-2xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<ol className="flex gap-5 mb-10 justify-between items-center w-full text-white">
					{
						queries.questions && [...Array(parseInt(queries.questions))].map((_, i) => (
							<li key={i} onClick={() => changueCurrent(i + 1)} className={`w-8 h-8 flex items-center justify-center pt-[2px] font-medium transition-all rounded-full text-center text-sm ${i + 1 === score ? "bg-red-500 hover:scale-105" : "bg-slate-600"} ${i + 1 <= score ? "cursor-pointer" : ""} ${i + 1 < score ? "bg-green-400" : ""} ${i + 1 === current ? "outline outline-offset-2 outline-blue-500" : ""} `}>
								{i + 1}
							</li>
						))
					}
				</ol>
				<main className='relative w-screen max-w-2xl min-h-[20rem] mx-auto overflow-hidden h-1/2'>
					{
						questions && questions.map((question, i) => {
							return (
								<div key={question.correct} className={`transition-all duration-500 ${i === 0 ? "" : "slide-right"} absolute text-center w-full`} id={"question-" + (i + 1)}>
									<p className='rounded-md bg-blue-500 px-10 py-6 text-white text-xl font-semibold block mb-3'>{question.question}</p>
									<ul className='md:columns-2 mt-4'>
										{question.answers && question.answers.map((answer, j) => (
											<li key={j + "answer"} className="relative">
												<button className={`${"answer-" + (i + 1)} pl-9 peer btn-primary w-full shadow-sm py-3 px-5 rounded mb-6`} onClick={(e) => validate(e, answer)}>{answer}</button >

												<Image className='absolute pointer-events-none left-2 top-1 peer-hover:translate-y-[0.25em] transition-transform z-20 invert' src={`/letters/letter-${["a", "b", "c", "d"][j]}.svg`} width={40} height={40} alt={`Question ${j + 1}]}`} />
											</li>
										))}
									</ul>
								</div>
							)
						})
					}
				</main>
			</div>

			<aside className='absolute top-4 md:right-5 md:top-1/2 md:-translate-y-1/2'>
				<nav >
					<ul className='flex gap-4 md:flex-col'>
						<li>
							<button className='p-3 aspect-square rounded bg-blue-500 w-full hover:scale-105 transition-transform'>
								<FiRepeat color='white' />
							</button>
						</li>
						<li>
							<button className='p-3 aspect-square rounded text-white bg-blue-500 w-full hover:scale-105 transition-transform text-sm'>
								50
							</button>
						</li>
						<li>
							<button className='p-3 aspect-square rounded bg-blue-500 w-full hover:scale-105 transition-transform'>
								<AiFillCloseCircle color='white' />
							</button>
						</li>
						<li className='p-3 aspect-square flex items-center rounded bg-blue-500 w-full'>
							<FaHeart color='white' />
						</li>
					</ul>
				</nav>
			</aside>

			<Footer alert={true} />
		</>
	)
}