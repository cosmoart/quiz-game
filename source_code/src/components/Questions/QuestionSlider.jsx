import Image from 'next/image'

export default function QuestionSlider ({ questions, loading, error, validateAnswer }) {
	if (error) {
		return <div className='flex h-32 md:h-[6.5rem] items-center justify-center rounded-md bg-red-500 px-10 py-6 text-white text-xl font-semibold'>
			An error occurred while loading the next questions...
		</div>
	}

	if (loading) {
		return (
			<div className='flex h-32 md:h-[6.5rem] items-center justify-center rounded-md bg-blue-500 px-10 py-6 text-white text-xl font-semibold'>
				Loading next questions...
			</div>
		)
	}

	return (
		<main className='relative max-w-2xl min-h-[28rem] md:min-h-[16rem] mx-auto overflow-hidden h-1/2'>
			{
				questions.map((question, i) => {
					return (
						<div key={question.correctAnswer + i} className={`transition-all duration-500 ${i === 0 ? '' : 'slide-right'} absolute text-center w-full`} id={'question-' + (i + 1)}>
							<p className='rounded-md h-32 md:h-[6.5rem] flex justify-center items-center bg-blue-500 px-10 py-6 text-white text-xl font-semibold mb-3'>
								{question.question}
							</p>

							<ul className='md:columns-2 mt-4 '>
								{question.answers.map((answer, j) => (
									<li key={j + answer} className="relative">
										<button className={`${'answer-' + (i + 1)} peer btn-primary w-full shadow-sm py-3 px-5 rounded mb-6`} onClick={validateAnswer}>
											{answer || '---'}
										</button >

										<Image className='absolute pointer-events-none left-2 top-1 peer-disabled:translate-y-0 peer-hover:translate-y-[0.25em] peer-active:translate-y-[0.75em] transition-transform z-20 invert' src={`/letters/letter-${['a', 'b', 'c', 'd'][j]}.svg`} width={40} height={40} alt={`Question ${j + 1}]}`} />
									</li>
								))}
							</ul>
						</div>
					)
				})
			}
		</main>
	)
}
