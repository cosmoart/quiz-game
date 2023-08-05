import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import PageLoading from '@/components/PageLoading'
import PageError from '@/components/PageError'
import PlayHeader from '@/components/Play/PlayHeader'
import GameInfo from '@/components/Play/GameInfo'
import Footer from '@/components/PageFooter'
import Questions from '@/components/Questions/Questions'

import queryValidator from '@/helpers/gameConfig'
import categories from '@/assets/categories.json'
import { useBoundStore } from '@/store/useBoundStore'

export default function Play () {
	const { loading, error, getQuestions, setQueries } = useBoundStore(state => state)
	const router = useRouter()

	useEffect(() => {
		if (router.isReady) {
			const validQuery = queryValidator(router.query)
			const cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name)
			setQueries(validQuery)
			getQuestions(cate, validQuery.infinitymode ? 5 : validQuery.questions)
		}
	}, [router.isReady])

	useEffect(() => { window.onbeforeunload = () => 'Are you sure you want to leave?' }, [])

	return (
		<>
			<Head><title>Quizi | Play</title></Head>
			{loading && <PageLoading />}
			{error[0] && <PageError />}
			{!loading && !error[0] && <>
				<PlayHeader />
				<GameInfo />
				<Questions />
				<Footer alert={true} />
				<style jsx global>
					{`
					body {
						background: url(play_bg.webp) center;
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
