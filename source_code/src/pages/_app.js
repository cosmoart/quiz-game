import '@/styles/globals.css'
import Layout from '../components/layout'
import { Rubik } from '@next/font/google'
import { useEffect } from 'react'

const rubik = Rubik({ subsets: ['latin'] })

export default function App ({ Component, pageProps }) {
	useEffect(() => document.body.classList.add(rubik.className), [])

	return (
		<Layout>
			<Component {...pageProps} className={rubik.className} />
		</Layout>
	)
}
