import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import getQuestion from "../../helpers/getQuestion"

export default function Play() {
	const [question, setQuestion] = useState('1');
	const correctSound = useRef(null);
	const wrongSound = useRef(null);

	useEffect(() => {
		getQuestion().then((question) => setQuestion(question));
	}, []);

	function validate(e, answer) {
		console.log(answer, question.correct);
		if (answer === question.correct) {
			e.target.style.backgroundColor = "green";
			e.target.classList.add("shake-left-right");
			correctSound.current.volume = 0.3;
			correctSound.current.play();
		} else {
			e.target.style.backgroundColor = "red";
			e.target.classList.add("vibrate");
			wrongSound.current.volume = 0.3;
			wrongSound.current.play();
		}
	}

	return (
		<>
			<Head>
				<title>Quizi | Juega</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Link href="/"><BiArrowBack className='text-3xl' /></Link>
			<audio ref={correctSound} src="sounds/correct_answer_sound.mp3" />
			<audio ref={wrongSound} src="sounds/wrong_answer_sound.mp3" />
			<main className='max-w-2xl mx-auto'>

				<ol class="flex mb-5 items-center w-full text-white">
					<li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
						<span class="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full lg:h-7 lg:w-7 dark:bg-blue-800 shrink-0">
							1
						</span>
					</li>
					<li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
						<span class="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full lg:h-7 lg:w-7 dark:bg-gray-700 shrink-0">
							2
						</span>
					</li>
					<li class="flex items-center w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
						<span class="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full lg:h-7 lg:w-7 dark:bg-gray-700 shrink-0">
							3
						</span>
					</li>
				</ol>

				<p className='rounded-md bg-purple-300 px-10 py-6 text-xl font-semibold block mb-3'>{question.question}</p>
				<ul className='columns-2 mb-5'>
					{question.answers && question.answers.map((answer, i) => (
						<li key={i + "answer"}>
							<button className={`w-full shadow-sm mt-4 bg-slate-200 py-3 px-5 rounded hover:scale-105 ${question.correct === answer ? "bg-green-100" : ""}`} onClick={(e) => validate(e, answer)}>{answer}</button>
						</li>
					))}
				</ul>
			</main>
			<button onClick={() => getQuestion().then((question) => setQuestion(question))}>Get Question</button>
		</>
	)
}