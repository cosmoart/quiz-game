import Head from 'next/head'
import Home from '@/components/Home'
import GameModes from '@/components/GameModes'
import Categories from '@/components/Categories'
import { useEffect } from 'react'

export default function Main() {

  useEffect(() => window.onbeforeunload = () => null, []);

  return (
    <>
      <Head>
        <title>Quizi</title>
      </Head>
      <Home />
      <GameModes />
      <Categories />
      <style jsx global>
        {`
				#__next {
					display: grid;
	        grid-template-columns: 1fr;
				}
        @media (min-width: 1024px) {
          #__next {
            grid-template-columns: 1.4fr 1fr;
          }
			  `}
      </style>
    </>
  )
}
