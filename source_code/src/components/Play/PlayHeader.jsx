import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import Link from 'next/link';

export default function PlayHeader() {
	return (
		<nav>
			<ul className='flex gap-3 p-3'>
				<li>
					<Link href="/" className='w-10'>
						<BiArrowBack color='#0f172a' className='text-4xl hover:scale-105 transition-all  p-1 bg-white rounded' title='Go back' />
					</Link>
				</li>
				<li>
					<button className='hover:scale-105 transition-all p-1 bg-white rounded' onClick={() => document.getElementById("newGameDialog").showModal()}>
						<BsArrowRepeat className='text-[27px]' color='#0f172a' title='New game' />
					</button>
				</li>
			</ul>
		</nav>
	)
}