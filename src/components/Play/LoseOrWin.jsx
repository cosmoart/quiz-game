export default function LoseOrWin({ win = false }) {

	return (
		<dialog className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-1/2 p-4 rounded-md bg-white'>
			<div className='flex flex-col items-center gap-4'>
				<h2 className='text-2xl font-bold'>{win ? 'You Win!' : 'You Lose!'}</h2>
				<p className='text-center'>
					{win
						? 'Congratulations!'
						: 'Better luck next time!'}
				</p>
				<button className='p-2 rounded-md bg-blue-500 text-white'>
					{win ? 'Play Again' : 'Try Again'}
				</button>
			</div>
		</dialog>
	)

}