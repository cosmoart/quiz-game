import Image from 'next/image'

export default function Question(props) {

	return (
		<div className='max-w-2xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<ol className="flex gap-5 mb-10 justify-between items-center w-full text-white">
				{
					queries.questions && [...Array(parseInt(queries.questions))].map((_, i) => (
						<li key={i} onClick={() => changueCurrent(i + 1)} className={`w-8 h-8 flex items-center justify-center pt-[2px] font-medium transition-all rounded-full text-center text-sm ${i + 1 === score ? "bg-red-500 hover:scale-105" : "bg-slate-600"} ${i + 1 <= score ? "cursor-pointer" : ""} ${i + 1 < score ? "bg-green-400" : ""} ${i + 1 === current ? "outline outline-offset-2 outline-blue-500" : ""} `}>
							{i + 1}
						</li>
					))
				}
			</ol>
			<main className='relative w-screen max-w-2xl min-h-[20rem] mx-auto overflow-hidden h-1/2'>
				{
					questions && questions.map((question, i) => {
						return (
							<div key={question.correct} className={`transition-all duration-500 ${i === 0 ? "" : "slide-right"} absolute text-center w-full`} id={"question-" + (i + 1)}>
								<p className='rounded-md bg-blue-500 px-10 py-6 text-white text-xl font-semibold block mb-3'>{question.question}</p>
								<ul className='md:columns-2 mt-4'>
									{question.answers && question.answers.map((answer, j) => (
										<li key={j + "answer"} className="relative">
											<button className={`${"answer-" + (i + 1)} peer btn-primary w-full shadow-sm py-3 px-5 rounded mb-6`} onClick={(e) => validate(e, answer)}>{answer}</button >

											<Image className='absolute pointer-events-none left-2 top-1 peer-hover:translate-y-[0.25em] transition-transform z-20 invert' src={`/letters/letter-${["a", "b", "c", "d"][j]}.svg`} width={40} height={40} alt={`Question ${j + 1}]}`} />
										</li>
									))}
								</ul>
							</div>
						)
					})
				}
			</main>
		</div>
	)
}