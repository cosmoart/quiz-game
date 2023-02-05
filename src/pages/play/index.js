import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import Footer from '@/components/Footer'
import queryValidator from '@/assets/data';
import Wildcards from '@/components/Play/Wildcards';
import Question from '@/components/Play/Question';
import GameInfo from '@/components/Play/GameInfo';
import PlayHeader from '@/components/Play/PlayHeader';

export default function Play() {
	const router = useRouter()
	const [queries, setQueries] = useState({});

	useEffect(() => {
		// window.onbeforeunload = () => "Your game will be lost!";
	}, []);

	useEffect(() => {
		setQueries(queryValidator(router.query || {}));
	}, [router.query]);

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
			</Head>

			<PlayHeader />
			{queries.mode && <GameInfo queries={queries} />}
			{queries.mode && < Question queries={queries} />}
			<Footer alert={true} />
		</>
	)
}