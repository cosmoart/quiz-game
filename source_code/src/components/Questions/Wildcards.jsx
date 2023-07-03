import Image from 'next/image'
import { BsSkipEndFill } from 'react-icons/bs'
import fiftyImg from '@/assets/fifty.svg'
import { FaHeart } from 'react-icons/fa'
import { useBoundStore } from '@/store/useBoundStore'
import { useEffect } from 'react'

export default function Wildcards () {
	const { wildCards, useSkipCard, queries, win, useHalfCard, currentQuestion, score } = useBoundStore(state => state)

	useEffect(() => {
		function shortcuts (e) {
			if (e.key === 's') useSkipCard()
			if (e.key === 'h') useHalfCard()
		}
		document.addEventListener('keydown', shortcuts)
		return () => document.removeEventListener('keydown', shortcuts)
	}, [])

	function disabled (type) {
		const finalQuestion = queries.infinitymode ? (score % 5 === 0 ? 5 : score % 5) : score
		return wildCards[type] < 1 || win !== undefined || currentQuestion !== finalQuestion
	}

	return (
		<aside className='absolute top-4 right-4 lg:top-1/2 lg:-translate-y-1/2 p-2 rounded-md bg-white'>
			<nav>
				<ul className='flex gap-4 lg:flex-col text-sm'>

					<li className={`relative transition-all ${disabled('skip') ? 'grayscale cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}>
						<button autoFocus onClick={useSkipCard} className='p-[10px] aspect-square rounded bg-blue-500 w-full' title='Skip question' disabled={disabled('skip')}>
							<BsSkipEndFill color='white' className='text-xl' />
							<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center font-semibold'>x{wildCards.skip}</span>
						</button>
					</li>

					<li className={`relative transition-all ${disabled('half') ? 'grayscale cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}>
						<button onClick={useHalfCard} className='p-[10px] aspect-square rounded bg-blue-500 w-full ' title='Delete two wrong questions' disabled={disabled('half')}>
							<Image src={fiftyImg.src} alt="fifty fifty" width={20} height={20} />
							<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center font-semibold'>x{wildCards.half}</span>
						</button>
					</li>

					<li className={`p-[10px] relative flex items-center rounded bg-blue-500 ${wildCards.lives < 1 ? 'grayscale' : ''}`} title='Lives'>
						<FaHeart color='white' className='text-xl' />
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center font-semibold'>x{wildCards.lives}</span>
					</li>

				</ul>
			</nav>
		</aside>
	)
}
