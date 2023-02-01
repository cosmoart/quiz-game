import categories from "../assets/categories.json"
import { useState } from 'react';
import Image from 'next/image'
import soundOn from "../assets/sound-on.svg"
import soundOff from "../assets/sound-off.svg"
import { MdInfo } from 'react-icons/md'

export default function Main() {
	const [sound, setSound] = useState(true);
	const [showInfo, setShowInfo] = useState(false);

	function handleTitleHover(t) {
		const target = document.getElementById(t);
		target.classList.add('jello-vertical');
		target.style.color = categories[Math.floor(Math.random() * categories.length)].color;

		target.addEventListener('animationend', () => {
			target.classList.remove('jello-vertical');
		});
	}

	function handleTitleLeave(t) {
		document.getElementById(t).style.color = 'white';
	}

	return (
		<main className='mainHome max-w-6xl relative  mx-auto w-full min-h-[25rem] flex gap-4 flex-col justify-between items-center px-5 md:px-10 py-20 lg:col-start-2 lg:row-start-1 lg:row-end-3 text-center text-white'>
			<div>
				<h1 className='text-8xl font-medium w-full uppercase z-10 relative' translate='no'>
					{"Quizi".split("").map((letter, index) => (
						<span key={index} id={letter + index + 10} className='relative inline-block transition-all duration-300' onMouseEnter={() => handleTitleHover(letter + index + 10)} onMouseLeave={() => handleTitleLeave(letter + index + 10)}>
							{letter}
						</span>
					))}
				</h1>
				<div className='bg-[#1c233a] absolute w-full lg:w-[41.7vw] h-40 top-16 left-0'></div>
				<p className='mb-20 relative'>
					Play an infinite number of possible questions!
				</p>
			</div>
			<button onClick={() => document.getElementById("newGameDialog").showModal()} id='play' href="play" className='btn-primary learn-more px-6 py-4 text-lg max-w-md w-full mx-auto mt-10'>Play</button>
			<nav className='absolute right-4 bottom-3'>
				<ul className='flex gap-4'>
					<li className='relative'>
						<button className={`align-middle relative z-20 hover:scale-105 p-1 bg-white rounded-md ${showInfo ? "scale-110" : ""}`} onClick={() => setShowInfo(!showInfo)}>
							<MdInfo className='text-[25px]' style={{ color: "#1c233a" }} />
						</button>
						<p className={`absolute text-sm md:text-base top-0 whitespace-nowrap bg-white text-slate-900 rounded-md py-1 px-4 text-left transition-all ${showInfo ? 'opacity-100 right-7 ' : 'opacity-0 right-0 pointer-events-none'}`}>
							<a href="https://github.com/cosmoart/quiz-game" target="_blank" rel="noopener noreferrer" className='underline'>MIT licence</a> - Made with ❤️ by <a href="https://github.com/cosmoart" target="_blank" rel="noreferrer" className='underline'>Cosmo</a>
						</p>
					</li>
					<li>
						<button className='align-middle hover:scale-105 p-1 bg-white rounded-md' onClick={() => setSound(!sound)}>
							{
								sound ?
									<Image src={soundOn} className="" alt="" width={25} height={25} onClick={() => setSound(false)} />
									:
									<Image src={soundOff} className="" alt="" width={25} height={25} onClick={() => setSound(true)} />
							}
						</button>
					</li>
				</ul>
			</nav>
		</main >
	)
}