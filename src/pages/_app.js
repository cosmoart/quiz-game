import '@/styles/globals.css'
import Layout from '../components/layout'
import Head from 'next/head'
import { Rubik } from "@next/font/google"
import { useEffect } from 'react';

const rubik = Rubik({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  useEffect(() => document.body.classList.add(rubik.className), []);

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Layout>
        <Component {...pageProps} className={rubik.className} />
      </Layout>
    </>
  )
}
