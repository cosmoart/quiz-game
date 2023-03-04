import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import queryValidator from '@/helpers/gameConfig'
import getQuestions from '@/helpers/getQuestions'

import Footer from '../PageFooter'
import GameInfo from './GameInfo'
import PlayHeader from './PlayHeader'
import QuestionsMain from '../Questions/QuestionsMain'
import categories from '@/assets/categories.json'

export default function PlayHome ({ loading, setLoading, setErrorQ, errorQ }) {
	const [questions, setQuestions] = useState([])
	const [queries, setQueries] = useState({})
	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			const validQuery = queryValidator(router.query)
			const cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name)
			setQueries(validQuery)

			getQuestions(cate, validQuery.infinitymode ? 5 : validQuery.questions)
				.then((q) => setQuestions(q))
				.catch((err) => setErrorQ([true, err]))
				.finally(() => setLoading(false))
		}
		if (!loading) router.reload()
	}, [router.isReady, router.query])

	return (
		<>
			{
				!loading && !errorQ[0] && <>
					<PlayHeader />
					<GameInfo />
					<QuestionsMain questions={questions} setQuestions={setQuestions} />
					<Footer alert={true} />
					<style jsx global>
						{`
							body {
								background: url(play_bg.png) center;
								background-size: 100% 100%;
							}
							@media (max-width: 1030px) {
								body {
									background-size: auto 100%;
								}
							}
						`}
					</style>
				</>
			}
		</>
	)
}
