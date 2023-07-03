import { BiArrowBack } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import Link from 'next/link'
import { useBoundStore } from '@/store/useBoundStore'

export default function PlayHeader () {
	const { cleanQuestions, cleanWildCards } = useBoundStore(state => state)

	return (
		<nav>
			<ul className='flex gap-4 p-4'>
				<li>
					<Link href="/" className='block' onClick={() => { cleanQuestions(); cleanWildCards() }}>
						<BiArrowBack color='#0f172a' className='text-4xl hover:scale-105 transition-all  p-1 bg-white rounded' title='Go back' />
					</Link>
				</li>
				<li>
					<button className='hover:scale-105 transition-all p-1 bg-white rounded' onClick={() => document.getElementById('newGameDialog').showModal()}>
						<BsArrowRepeat className='text-[28px]' color='#0f172a' title='New game' />
					</button>
				</li>
			</ul>
		</nav>
	)
}
