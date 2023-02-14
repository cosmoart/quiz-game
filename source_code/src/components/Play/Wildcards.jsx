import { BsSkipEndFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import fiftyImg from "@/assets/fifty.svg"

export default function Wildcards({ wildCards, wilcardSkip, wilcardFifty, wilcardChangue }) {
	return (
		<aside className='absolute top-4 right-4 lg:top-1/2 lg:-translate-y-1/2 p-2 rounded-md bg-white'>
			<nav>
				<ul className='flex gap-4 lg:flex-col'>

					<li className={`relative ${wildCards.skip < 1 ? "grayscale cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}>
						<button onClick={wilcardSkip} className='p-[10px] aspect-square rounded bg-blue-500 w-full transition-transform' title='Skip question' disabled={wildCards.skip < 1}>
							<BsSkipEndFill color='white' className='text-xl' />
						</button>
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center text-sm font-medium'>x{wildCards.skip}</span>
					</li>

					<li className={`relative ${wildCards.half < 1 ? "grayscale cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}>
						<button onClick={wilcardFifty} className='p-[10px] aspect-square rounded text-white bg-blue-500 w-full  transition-transform text' title='Delete two wrong questions' disabled={wildCards.half < 1}>
							<img src={fiftyImg.src} alt="fifty fifty" width={20} />
						</button>
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center text-sm font-medium'>x{wildCards.half}</span>
					</li>

					<li className={`relative ${wildCards.doubled < 1 ? "grayscale cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}>
						<button onClick={wilcardChangue} className='p-[10px] aspect-square rounded bg-blue-500 w-full transition-transform' title='Second chance' disabled={wildCards.doubled < 1}>
							<FaWindowClose color='white' className='text-xl' />
						</button>
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center text-sm font-medium'>x{wildCards.doubled}</span>
					</li>

					<li className={`p-[10px] relative aspect-square flex items-center rounded bg-blue-500 w-full ${wildCards.lives < 1 ? "grayscale" : ""}`} title='Lives'>
						<FaHeart color='white' className='text-xl' />
						<span className='absolute -bottom-2 -right-2 bg-white rounded-full aspect-square w-6 flex justify-center items-center text-sm font-medium'>x{wildCards.lives}</span>
					</li>

				</ul>
			</nav>
		</aside>
	)
}