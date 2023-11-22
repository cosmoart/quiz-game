import Image from 'next/image'
import Link from 'next/link'

import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import { useCallback, useEffect, useRef } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { BiArrowBack } from 'react-icons/bi'
import trophyIcon from '@/assets/trophy.svg'

import playSound from '@/helpers/playSound'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useBoundStore } from '@/store/useBoundStore'

const canvasStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	width: '100%',
	height: '100%',
	top: 0,
	left: 0,
	zIndex: 100
}

export default function GameOver () {
	const { queries, score, win } = useBoundStore(state => state)
	const refAnimationInstance = useRef(null)

	const getInstance = useCallback((instance) => {
		refAnimationInstance.current = instance
	}, [])

	const makeShot = useCallback((particleRatio, opts) => {
		refAnimationInstance.current &&
			refAnimationInstance.current({
				...opts,
				origin: { y: 0.7 },
				particleCount: Math.floor(200 * particleRatio)
			})
	}, [])

	const fire = useCallback(() => {
		makeShot(0.25, {
			spread: 26,
			startVelocity: 55
		})

		makeShot(0.2, {
			spread: 60
		})

		makeShot(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8
		})

		makeShot(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2
		})

		makeShot(0.1, {
			spread: 120,
			startVelocity: 45
		})
	}, [makeShot])

	useEffect(() => {
		if (win === true) {
			fire()
			playSound('win', 0.2)
		}
	}, [win])

	function closeDialog () {
		playSound('pop', 0.2)
		document.getElementById('gameoverdialog').close()
		document.getElementById('gameoverbg').style.display = 'none'
	}

	function finalImage () {
		if (queries.infinitymode) return <Image src={trophyIcon} width={100} height={200} alt='Trophy' />
		if (win === true) return <AiFillCheckCircle className='text-8xl text-green-500' />
		return <AiFillCloseCircle className='text-8xl text-red-500' />
	}

	function finalTitle () {
		if (queries.infinitymode) return 'Congratulations!'
		if (win === true) return 'You Win!'
		return 'You Lose!'
	}

	function finalText () {
		if (queries.infinitymode) return `You answered well ${score} questions!`
		if (win === true) return 'Congratulations! \nQuiz completed successfully.'
		return 'Better luck next time! \nYou can try again.'
	}

	return (
		<>
			<div onClick={closeDialog} id="gameoverbg" className='transition-all fixed z-30 w-screen h-screen backdrop-blur-sm top-0 left-0'></div>

			<ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />

			<dialog id='gameoverdialog' open={true} className='fixed m-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-md px-6 py-12 rounded-md bg-white text-slate-900 z-40'>
				<button className='absolute top-2 right-2 text-3xl hover:scale-105' onClick={closeDialog}>
					<IoCloseSharp />
				</button>

				<div className='flex flex-col items-center gap-4'>
					{finalImage()}
					<h2 className='text-2xl font-bold'>{finalTitle()}</h2>
					<p className='text-center mb-3 whitespace-pre-line'>
						{finalText()}
					</p>
					<div className='flex gap-6 items-center'>
						<Link href="/" className='px-5 md:px-10 hover:opacity-75 bg-slate-200 py-3 rounded-md transition-colors'>
							<BiArrowBack color='#0f172a' className='text-xl mr-1 inline-block' title='' />
							Go back
						</Link>
						<button onClick={() => document.getElementById('newGameDialog').showModal()} className='btn-primary px-5 md:px-10 py-3 uppercase tracking-widest rounded-md bg-blue-500 text-white'>
							{queries.infinitymode || win !== false ? 'Play Again' : 'Try Again'}
						</button>
					</div>
				</div>
			</dialog>
		</>
	)
}
