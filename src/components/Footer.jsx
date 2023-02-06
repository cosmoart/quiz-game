import Image from 'next/image'
import soundOn from "../assets/sound-on.svg"
import soundOff from "../assets/sound-off.svg"
import { useEffect, useState } from 'react';
import { MdInfo } from 'react-icons/md'
import { GoAlert } from 'react-icons/go';

export default function Footer({ alert = false }) {
	const [sound, setSound] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	useEffect(() => {
		localStorage.getItem("sound") === "true" ? true : false
	}, []);

	useEffect(() => {
		localStorage.setItem("sound", sound);
	}, [sound]);

	return (
		<footer className='fixed right-4 bottom-3 z-40'>
			<nav>
				<ul className='flex gap-4'>

					<li className='relative'>
						<button title='Show info' className={`align-middle relative z-20 hover:scale-105 p-1.5 bg-white rounded-md ${showInfo ? "scale-110" : ""}`} onClick={() => setShowInfo(!showInfo)}>
							{
								alert
									? <GoAlert className='text-[25px] mx-auto' color='#0f172a' />
									: <MdInfo className='text-[25px]' style={{ color: "#1c233a" }} />
							}
						</button>
						<p className={`absolute bottom-full -right-14 sm:bottom-auto sm:top-[2px] whitespace-pre sm:whitespace-nowrap text-sm md:text-base whitespace-nowrap bg-white text-slate-900 rounded-md py-1 px-4 text-left transition-all ${showInfo ? 'opacity-100 -right-14  sm:!right-7 ' : 'opacity-0 right-0 pointer-events-none'}`}>
							{
								alert
									? `Questions made by AI.
The questions and answers may have errors.`
									: <span><a href="https://github.com/cosmoart/quiz-game" target="_blank" rel="noopener noreferrer" className='underline'>MIT licence</a> - Made with ❤️ by <a href="https://github.com/cosmoart" target="_blank" rel="noreferrer" className='underline'>Cosmo</a></span>
							}
						</p>
					</li>

					<li>
						<button title={sound ? "Mute" : "Play music"} className='align-middle hover:scale-105 p-1.5 bg-white rounded-md' onClick={() => setSound(!sound)}>
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
		</footer>
	)
}