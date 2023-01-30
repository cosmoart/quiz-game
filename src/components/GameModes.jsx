import Link from 'next/link'
import { ImInfinite } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { TbDeviceGamepad2 } from 'react-icons/tb'

export default function GameModes() {
	return (
		<section className='max-w-6xl mx-auto lg:col-start-1 lg:col-end-2 px-8 py-6 flex flex-col justify-center bg-[url("/patternpad2.svg")]'>
			<h2 className='text-2xl mb-4'>Game modes </h2>
			<nav>
				<ul className='flex flex-col md:flex-row justify-center gap-5'>
					<li className='bg-slate-200 bg-opacity-30 backdrop-blur-md rounded p-5'>
						<TbDeviceGamepad2 className='text-3xl' />
						<h3 className='text-xl'>Classic</h3>
						<p className='text-sm'>Complete questions without fail to win! You have wildcards that can help you</p>
					</li>
					<li className='bg-slate-200 rounded p-5'>
						<BiTimeFive className='text-3xl' />
						<h3 className='text-xl'>Time</h3>
						<p className='text-sm'>Complete timed questions to win! You have wildcards that can help you</p>
					</li>
					<li className='bg-slate-200 rounded p-5'>
						<ImInfinite className='text-3xl' />
						<h3 className='text-xl'>Infinite</h3>
						<p className='text-sm'>Complete as many questions as you can without fail! You have wildcards that you can use and buy</p>
					</li>
				</ul>
			</nav>
		</section>
	)
}