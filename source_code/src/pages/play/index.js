import { useEffect, useState } from 'react'
import Head from 'next/head'
import PageLoading from '@/components/PageLoading'
import PageError from '@/components/PageError'
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
				loading && <PageLoading />
			}
			{
				errorQ[0] && <PageError errorQ={errorQ} />
			}
			<PlayHome setLoading={setLoading} setErrorQ={setErrorQ} errorQ={errorQ} loading={loading} />
		</>
	)
}
