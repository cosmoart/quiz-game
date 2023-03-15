import { BsSkipEndFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import fiftyImg from '@/assets/fifty.svg'
import Image from 'next/image'
import { WildcardsContext } from '@/context/WildcardsContext'
import { QueriesContext } from '@/context/QueriesContext'
import { useContext } from 'react'
import playSound from '@/helpers/playSound'

export default function Wildcards ({ win, setWin, current, score, questions, setQuestions, clickAnswers, scoreInfinity, getAnotherQuestions }) {
	const { queries } = useContext(QueriesContext)
	const { wildCards, subtractWildcard } = useContext(WildcardsContext)

	function wilcardSkip () {
		if (wildCards.skip < 1 && !queries.infinitymode && current !== score) return
		if (wildCards.skip > 0 && current === Number(queries.questions)) {
			if (queries.infinitymode && scoreInfinity[0] === scoreInfinity[1]) return getAnotherQuestions()
			else setWin(1)
		}

		playSound('correct_answer', 0.3)
		subtractWildcard('skip')
		if (current === Number(queries.questions) && !queries.infinitymode) {
			clickAnswers(true, false)
		} else clickAnswers()

		if (!queries.infinitymode) {
			setQuestions(questions => {
				questions[current - 1].userAnswer = 2
				return questions
			})
		}
	}

	function wilcardFifty () {
		if (wildCards.half < 1) {
			if (queries.infinitymode && scoreInfinity[0] === scoreInfinity[1]) return getAnotherQuestions()
			else if (current !== score) return
		}

		subtractWildcard('half')
		const answers = document.querySelectorAll(`.answer-${current}`)
		const correct = questions[current - 1].correctAnswer
		const wrongs = [...answers].filter(answer => answer.textContent !== correct)

		wrongs.sort(() => Math.random() - 0.5).slice(0, 2).forEach(wrong => {
			wrong.classList.add('wrongAnswer')
			wrong.parentNode.classList.add('vibrate')
			wrong.disabled = true
		})
	}

	return (
		<aside className='absolute top-4 right-4 lg:top-1/2 lg:-translate-y-1/2 p-2 rounded-md bg-white'>
			<nav>
				<ul className='flex gap-4 lg:flex-col'>

					<li className={`relative ${wildCards.skip < 1 || win !== 0 ? 'grayscale cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}>
						<button onClick={wilcardSkip} className='p-[10px] aspect-square rounded bg-blue-500 w-full transition-transform' title='Skip question' disabled={wildCards.skip < 1 || win !== 0}>
							<BsSkipEndFill color='white' className='text-xl' />
						</button>
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center text-sm font-medium'>x{wildCards.skip}</span>
					</li>

					<li className={`relative ${wildCards.half < 1 || win !== 0 ? 'grayscale cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}>
						<button onClick={wilcardFifty} className='p-[10px] aspect-square rounded text-white bg-blue-500 w-full  transition-transform text' title='Delete two wrong questions' disabled={wildCards.half < 1 || win !== 0}>
							<Image src={fiftyImg.src} alt="fifty fifty" width={20} height={20} />
						</button>
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center text-sm font-medium'>x{wildCards.half}</span>
					</li>

					<li className={`p-[10px] relative flex items-center rounded bg-blue-500 ${wildCards.lives < 1 ? 'grayscale' : ''}`} title='Lives'>
						<FaHeart color='white' className='text-xl' />
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center text-sm font-medium'>x{wildCards.lives}</span>
					</li>

				</ul>
			</nav>
		</aside>
	)
}
