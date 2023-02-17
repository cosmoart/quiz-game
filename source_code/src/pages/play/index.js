import { useEffect, useState } from 'react'
import Head from 'next/head'
import Loader from '@/components/LoadingPage'
import ErrorPage from '@/components/ErrorPage'
import PlayHome from '@/components/Play/PlayHome'

export default function Play () {
	const [loading, setLoading] = useState(true)
	const [errorQ, setErrorQ] = useState([false, {}])

	useEffect(() => { window.onbeforeunload = () => 'Are you sure you want to leave?' }, [])

	return (
		<>
			<Head>
				<title>Quizi | Play</title>
			</Head>
			{
				loading && <Loader />
			}
			{
				errorQ[0] && <ErrorPage errorQ={errorQ} />
			}
			<PlayHome setLoading={setLoading} setErrorQ={setErrorQ} errorQ={errorQ} loading={loading} />
		</>
	)
}
