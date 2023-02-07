import { ImInfinite } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { TbDeviceGamepad2 } from 'react-icons/tb'

export default function GameModes() {
	return (
		<section className='lg:max-w-6xl mx-auto lg:col-start-1 lg:col-end-2 px-8 py-6 flex flex-col justify-center bg-[url("/bg-gamemodes.svg")] text-slate-900'>
			<h2 className='text-2xl mb-4 font-medium '>Game modes </h2>
			<nav>
				<ul className='flex flex-col sm:flex-row justify-center gap-5'>
					<li className='bg-neutral-300 max-w-sm md:max-w-none bg-opacity-30 backdrop-blur-[2px] rounded p-5 hover:scale-[1.03] transition-all hover:backdrop-blur-0 hover:bg-opacity-100 hover:bg-white shadow-sm mx-auto'>
						<TbDeviceGamepad2 className='text-3xl' />
						<h3 className='text-xl font-medium my-1'>Classic</h3>
						<p className='text-sm'>Complete questions without fail to win! You have wildcards that can help you</p>
					</li>
					<li className='bg-neutral-300 max-w-sm md:max-w-none bg-opacity-30 backdrop-blur-[2px] rounded p-5 hover:scale-[1.03] transition-all hover:backdrop-blur-0 hover:bg-opacity-100 hover:bg-white shadow-sm mx-auto'>
						<BiTimeFive className='text-3xl' />
						<h3 className='text-xl font-medium my-1'>Time</h3>
						<p className='text-sm'>Complete timed questions to win! You have wildcards that can help you</p>
					</li>
					<li className='bg-neutral-300 max-w-sm md:max-w-none bg-opacity-30 backdrop-blur-[2px] rounded p-5 hover:scale-[1.03] transition-all hover:backdrop-blur-0 hover:bg-opacity-100 hover:bg-white shadow-sm mx-auto'>
						<ImInfinite className='text-3xl' />
						<h3 className='text-xl font-medium my-1'>Infinite</h3>
						<p className='text-sm'>Complete as many questions as you can without fail! You have wildcards that you can use and buy</p>
					</li>
				</ul>
			</nav>
		</section>
	)
}