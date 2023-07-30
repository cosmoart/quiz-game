import { useBoundStore } from '@/store/useBoundStore'

export default function QuestionsNavbar ({ changueCurrent }) {
	const { queries, questions, currentQuestion, score } = useBoundStore(state => state)

	if (queries.infinitymode) {
		return <div className='mx-auto bg-white text-black rounded-full z-10 w-14 grid place-items-center aspect-square mb-4 text-xl font-medium'>{score}</div>
	}

	function buttonBg (i) {
		console.log(questions, i, questions[i])
		let bg = 'bg-slate-600 hover:cursor-auto'
		if (i + 1 === score) bg = 'bg-white text-blue-500'
		if (questions[i].userAnswer === 1) bg = 'bg-green-500 !text-white'
		if (questions[i].userAnswer === -1) bg = 'bg-red-500 !text-white'
		if (questions[i].userAnswer === 2) bg = 'bg-blue-500 !text-white'
		if (i + 1 <= score) bg += ' cursor-pointer hover:scale-105'
		if (i + 1 === currentQuestion) bg += ' outline outline-offset-2 hover:outline-offset-4 outline-blue-500'
		return bg
	}

	return (
		<ol className='progressBar mt-8 md:mt-0 flex relative overflow-auto sm:overflow-visible  mb-5 md:mb-10 justify-between items-center w-full text-white after:absolute after:top-1/2 after:-z-10 after:transition-all after:duration-700 after:rounded-full after:-translate-y-1/2 after:h-[6px] after:bg-blue-500' style={{ '--segments': parseInt(questions.length) - 1, '--current': score - 1 }}>
			{[...Array(parseInt(questions.length))].map((_, i) => (
				<li key={i}>
					<button onClick={() => changueCurrent(i + 1)} disabled={i + 1 > score} className={`w-8 h-8 flex items-center justify-center pt-[2px] font-medium transition-all rounded-full text-center text-sm ${buttonBg(i)}`}>{i + 1}</button>
				</li>
			))}
		</ol>
	)
}
