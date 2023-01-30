import { AiFillSound } from 'react-icons/ai'
import { AiOutlineInfoCircle } from 'react-icons/ai'

export default function Main() {
	return (
		<main className='max-w-6xl relative mx-auto w-full min-h-[25rem] flex gap-4 flex-col justify-center items-start px-10 lg:col-start-2 lg:row-start-1 lg:row-end-3 text-white'>
			<h1 className='text-7xl text-center w-full uppercase' translate='no'>Quizi</h1>
			<p className='mb-20'>
				Answer questions and get points
			</p>
			{/* <p>
				Made with <a href="https://midu.link/ia">cohere</a> by <a href="https://github.com/cosmoart">Cosmo</a> for the <a href="https://github.com/midudev/midu-cohere-hackathon">Midudev Cohere Hackathon</a>
			</p> */}
			<button onClick={() => document.getElementById("newGameDialog").showModal()} id='play' href="play" className='px-6 py-5 text-center rounded-md bg-blue-600 max-w-xl w-full mx-auto mt-10 uppercase  hover:scale-105'>Play</button>
			<nav className='absolute right-4 bottom-3'>
				<ul className='flex gap-5'>
					<li>
						<button><AiFillSound className='text-2xl' /></button>
					</li>
					<li>
						<button><AiOutlineInfoCircle className='text-2xl' /></button>
					</li>
				</ul>
			</nav>
		</main >
	)
}