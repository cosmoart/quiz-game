import Image from 'next/image'
import soundOn from "../assets/sound-on.svg"
import soundOff from "../assets/sound-off.svg"
import { MdInfo } from 'react-icons/md'
import { useState } from 'react';

export default function Main() {
	const [sound, setSound] = useState(true);

	return (
		<main className='mainHome max-w-6xl relative  mx-auto w-full min-h-[25rem] flex gap-4 flex-col justify-between items-center px-10 py-20 lg:col-start-2 lg:row-start-1 lg:row-end-3 text-center text-white'>
			<div>
				<h1 className='text-8xl font-medium w-full uppercase z-10 relative' translate='no'>Quizi</h1>
				<div className='bg-[#1c233a] absolute w-full lg:w-[41.7vw] h-40 top-16 left-0'></div>
				<p className='mb-20 relative'>
					Play an infinite number of possible questions!
				</p>
			</div>
			<button onClick={() => document.getElementById("newGameDialog").showModal()} id='play' href="play" className='px-6 py-4 -tracking-tighter text-lg text-center rounded-md bg-blue-600 max-w-md w-full mx-auto mt-10 uppercase transition-all hover:scale-[1.02]'>Play</button>
			<nav className='absolute right-4 bottom-3'>
				<ul className='flex gap-4'>
					<li className='relative'>
						<button className='peer align-middle hover:scale-105'><MdInfo className='text-[27px]' /></button>
						<p className='peer-hover:opacity-100 opacity-0 absolute right-5 top-0 whitespace-nowrap'>
							Made with <a href="https://midu.link/ia">cohere</a> by <a href="https://github.com/cosmoart">Cosmo</a> for the <a href="https://github.com/midudev/midu-cohere-hackathon">Midudev Cohere Hackathon</a>
						</p>
					</li>
					<li>
						<button className='align-middle hover:scale-105' onClick={() => setSound(!sound)}>
							{
								sound ?
									<Image src={soundOn} className="invert" alt="" width={28} height={28} onClick={() => setSound(false)} />
									:
									<Image src={soundOff} className="invert" alt="" width={28} height={28} onClick={() => setSound(true)} />
							}
						</button>
					</li>
				</ul>
			</nav>
		</main >
	)
}