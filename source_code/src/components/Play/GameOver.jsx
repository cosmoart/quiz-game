import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { IoCloseSharp } from 'react-icons/io5';
import Link from 'next/link';

const canvasStyles = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	zIndex: 100
};

export default function GameOver({ win }) {
	const [showDialog, setShowDialog] = useState(false);
	const refAnimationInstance = useRef(null);

	const getInstance = useCallback((instance) => {
		refAnimationInstance.current = instance;
	}, []);

	const makeShot = useCallback((particleRatio, opts) => {
		refAnimationInstance.current &&
			refAnimationInstance.current({
				...opts,
				origin: { y: 0.7 },
				particleCount: Math.floor(200 * particleRatio)
			});
	}, []);

	const fire = useCallback(() => {
		makeShot(0.25, {
			spread: 26,
			startVelocity: 55
		});

		makeShot(0.2, {
			spread: 60
		});

		makeShot(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 45
		});
	}, [makeShot]);

	useEffect(() => {
		if (win === 1) fire();
		if (win !== 0) {
			setShowDialog(true);
		}
	}, [win]);

	function closeDialog() {
		setShowDialog(false);
		document.getElementById("loseorwindialog").close()
	}

	if (win === 0) return null

	return (
		<>
			<div onClick={closeDialog} className={`${!showDialog && "scale-0 opacity-0"} transition-all fixed z-30 w-screen h-screen backdrop-blur-sm top-0 left-0`}></div>
			<ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
			<dialog id='loseorwindialog' open={win !== 0} className='fixed m-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-sm px-6 py-10 rounded-md bg-white text-slate-900 z-40'>
				<button
					className='absolute top-2 right-2 text-3xl'
					onClick={closeDialog}>
					<IoCloseSharp />
				</button>
				<div className='flex flex-col items-center gap-4'>
					{win !== -1
						? <AiFillCheckCircle className='text-8xl text-green-500' />
						: <AiFillCloseCircle className='text-8xl text-red-500' />
					}
					<h2 className='text-2xl font-bold'>{win !== -1 ? 'You Win!' : 'You Lose!'}</h2>
					<p className='text-center mb-3 whitespace-pre-line'>
						{win !== -1
							? `Congratulations!
							Quiz completed successfully.`
							: `Better luck next time!
							You can try again.`
						}
					</p>
					<div className='flex gap-4 items-center'>
						<Link href="/" className='px-4 hover:opacity-75'>Go back</Link>
						<button onClick={() => document.getElementById("newGameDialog").showModal()} className='btn-primary px-10 py-3 uppercase tracking-widest rounded-md bg-blue-500 text-white'>
							{win !== -1 ? 'Play Again' : 'Try Again'}
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
}