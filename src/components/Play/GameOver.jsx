import Link from 'next/link'
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0
};

export default function GameOver({ win }) {
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
	}, [win, fire]);

	if (win === 0) return null;
	return (
		<>
			<ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
			<dialog id='loseorwindialog' open={true} className='absolute m-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-md px-6 py-10 rounded-md bg-white text-slate-900'>
				<div className='flex flex-col items-center gap-4'>
					{win !== -1
						? <AiFillCheckCircle className='text-7xl text-green-500' />
						: <AiFillCloseCircle className='text-7xl text-red-500' />
					}
					<h2 className='text-2xl font-bold'>{win ? 'You Win!' : 'You Lose!'}</h2>
					<p className='text-center'>
						{win !== -1
							? 'Congratulations!'
							: 'Better luck next time!'
						}
					</p>
					<Link href="/" className='btn-primary uppercase tracking-widest rounded-md bg-blue-500 text-white'>
						{win ? 'Play Again' : 'Try Again'}
					</Link>
				</div>
			</dialog>
		</>
	);
}