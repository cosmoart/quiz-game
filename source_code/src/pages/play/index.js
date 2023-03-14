import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import PageLoading from '@/components/PageLoading'
import PageError from '@/components/PageError'
import PlayHome from '@/components/Play/PlayHome'

import getQuestions from '@/helpers/getQuestions'
import queryValidator from '@/helpers/gameConfig'
import categories from '@/assets/categories.json'

export default function Play () {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState([false, {}])
	const [questions, seQuestions] = useState([])
	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			const validQuery = queryValidator(router.query)
			const cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name)
			getQuestions(cate, validQuery.infinitymode ? 5 : validQuery.questions)
				.then(data => seQuestions(data))
				.catch(err => setError([true, err]))
				.finally(() => setLoading(false))
		}
	}, [router.isReady])

	useEffect(() => { window.onbeforeunload = () => 'Are you sure you want to leave?' }, [])

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
			</Head>
			{loading && <PageLoading />}
			{error[0] && <PageError error={error} />}
			{!loading && !error[0] && <PlayHome questions={questions} />}
		</>
	)
}
