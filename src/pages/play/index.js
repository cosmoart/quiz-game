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
import Loader from '@/components/Loader'
import Link from 'next/link';

export default function Play() {
	const [questions, setQuestions] = useState([]);
	const [queries, setQueries] = useState({});
	const [loading, setLoading] = useState(true);
	const [errorQ, setErrorQ] = useState(false);

	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			let validQuery = queryValidator(router.query);
			setQueries(validQuery);
			let cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name);
			getQuestions(cate, validQuery.questions).then((q) => {
				setQuestions(q);
				setLoading(false);
			}).catch((err) => {
				setErrorQ(true);
				setLoading(false);
			})
		}
		console.log(loading);
		if (!loading) router.reload();
	}, [router.isReady, router.query]);

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
			</Head>

			{
				loading
					? <div className="text-slate-900 bg-white rounded-md px-6 py-4 text-2xl flex items-center justify-center absolute top-0 left-0 w-screen h-screen cursor-progress">
						<div title="Loading..." >
							<Loader />
						</div>
					</div>
					: errorQ ? <div className="text-slate-900 bg-white rounded-md px-6 py-4 text-2xl flex items-center justify-center flex-col absolute top-0 left-0 w-screen h-screen cursor-progress text-center">
						<p>Ooops! Something went wrong. Please try again later.</p>
						<Link className='text-blue-600 underline text-lg' href='/'>Go back to home</Link>
					</div>
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