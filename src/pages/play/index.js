import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import getQuestion from "@/helpers/getQuestion"
import Footer from '@/components/Footer'
import { defaultConfig } from '@/components/NewGame';
import Wildcards from '@/components/Play/Wildcards';
import Question from '@/components/Play/Question';
import GameInfo from '@/components/Play/GameInfo';
import PlayHeader from '@/components/Play/PlayHeader';

export default function Play() {
	const router = useRouter()

	const [questions, setQuestions] = useState([]);
	const [queries, setQueries] = useState({});

	useEffect(() => {
		getQuestion().then((q) => setQuestions(q));

		window.onbeforeunload = () => "Your game will be lost!";
		// document.body.style.backgroundImage = "url('/pattern3.svg')";
	}, []);

	useEffect(() => {
		setQueries({
			questions: router.query.questions || defaultConfig.questions,
			time: router.query.time || defaultConfig.time,
			mode: router.query.mode || defaultConfig.mode,
			categories: router.query.categories || defaultConfig.categories.join(',')
		});
	}, [router.query]);

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
			</Head>

			<PlayHeader />
			<GameInfo queries={queries} />
			<Question questions={questions} queries={queries} />
			<Wildcards />
			<Footer alert={true} />
		</>
	)
}