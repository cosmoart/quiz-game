import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import Footer from '@/components/Footer'
import queryValidator from '@/helpers/gameConfig';
import Questions from '@/components/Play/Questions';
import GameInfo from '@/components/Play/GameInfo';
import PlayHeader from '@/components/Play/PlayHeader';
import getQuestions from "@/helpers/getQuestions"
import categories from '@/assets/categories.json'

export default function Play() {
	const [questions, setQuestions] = useState([]);
	const [queries, setQueries] = useState({});
	const [loading, setLoading] = useState(true);
	const router = useRouter()

	useEffect(() => {
		// window.onbeforeunload = () => "Your game will be lost!";
	}, []);

	useEffect(() => {
		if (router.isReady) {
			let validQuery = queryValidator(router.query);
			setQueries(validQuery);

			let cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name);
			setLoading(true);
			console.log(getQuestions(cate, queries.questions));
			getQuestions(cate, queries.questions).then((q) => {
				setQuestions(q);
				setLoading(false);
			});
		}
		console.log(loading)
	}, [router.isReady]);

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
			</Head>

			{
				loading
					? <div className="text-slate-900 bg-white rounded-md px-6 py-4 text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</div>
					: <>
						<PlayHeader />
						<GameInfo queries={queries} />
						<Questions queries={queries} questions={questions} setQuestions={setQuestions} />
						<Footer alert={true} />
					</>
			}
		</>
	)
}