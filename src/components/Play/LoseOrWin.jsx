import Link from 'next/link'
import { useEffect } from 'react'
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'


export default function LoseOrWin({ win = false }) {
	return (
		<dialog id='loseorwindialog' open={true} className='absolute m-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-md px-6 py-10 rounded-md bg-white text-slate-900'>
			<div className='flex flex-col items-center gap-4'>
				{win
					? <AiFillCheckCircle className='text-7xl text-green-500' />
					: <AiFillCloseCircle className='text-7xl text-red-500' />
				}
				<h2 className='text-2xl font-bold'>{win ? 'You Win!' : 'You Lose!'}</h2>
				<p className='text-center'>
					{win
						? 'Congratulations!'
						: 'Better luck next time!'}
				</p>
				<Link href="/" className='btn-primary uppercase tracking-widest rounded-md bg-blue-500 text-white'>
					{win ? 'Play Again' : 'Try Again'}
				</Link>
			</div>
		</dialog>
	)

}