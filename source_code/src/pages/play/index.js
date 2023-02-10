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
import Loader from '@/components/LoadingPage'
import ErrorPage from '@/components/ErrorPage';

export default function Play() {
	const [questions, setQuestions] = useState([]);
	const [queries, setQueries] = useState({});
	const [loading, setLoading] = useState(true);
	const [errorQ, setErrorQ] = useState([false, {}]);

	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			let validQuery = queryValidator(router.query);
			setQueries(validQuery);
			let cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name);
			getQuestions(cate, validQuery.questions)
				.then((q) => {
					setQuestions(q);
				}).catch((err) => {
					setErrorQ([true, err]);
				}).finally(() => setLoading(false));
		}
		console.log(errorQ.statusCode);
		if (!loading) router.reload();
	}, [router.isReady, router.query]);

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
			</Head>

			{
				loading
					? <Loader />
					: errorQ[0]
						? <ErrorPage errorQ={errorQ} />
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