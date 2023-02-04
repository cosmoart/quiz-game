import { BsSkipEndFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Wildcards() {
	return (
		<aside className='absolute top-4 md:right-5 md:top-1/2 md:-translate-y-1/2 p-2 rounded-md bg-white'>
			<nav >
				<ul className='flex gap-4 md:flex-col'>
					<li>
						<button className='p-[10px] aspect-square rounded bg-blue-500 w-full hover:scale-105 transition-transform'>
							<BsSkipEndFill color='white' className='text-xl' />
						</button>
					</li>
					<li>
						<button className='p-[10px] aspect-square rounded text-white bg-blue-500 w-full hover:scale-105 transition-transform text'>
							50
						</button>
					</li>
					<li>
						<button className='p-[10px] aspect-square rounded bg-blue-500 w-full hover:scale-105 transition-transform'>
							<AiFillCloseCircle color='white' className='text-xl' />
						</button>
					</li>
					<li className='p-[10px] aspect-square flex items-center rounded bg-blue-500 w-full'>
						<FaHeart color='white' className='text-xl' />
					</li>
				</ul>
			</nav>
		</aside>
	)
}