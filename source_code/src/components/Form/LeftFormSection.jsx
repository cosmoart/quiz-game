import Image from 'next/image'
import { BsSkipEndFill } from 'react-icons/bs'
import { IoMdInfinite } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import fiftyImg from '@/assets/fifty.svg'
import { quiziConfig } from '@/helpers/gameConfig'

export default function LeftFormSection ({ handleInputs, queries, nowQueries }) {
	return (
		<div className='flex gap-2 sm:gap-5 flex-col'>
			{/* WILCARDS */}
			<fieldset className='p-1'>
				<legend className='text-lg font-semibold mb-2'>Wilcards</legend>
				<ul className='flex gap-3 justify-between'>
					<li className={'flex gap-2 justify-center items-center'}>
						<div className='p-[10px] aspect-square rounded bg-blue-500 transition-transform' title='Skip question' disabled={true < 1}>
							<BsSkipEndFill color='white' className='text-2xl' />
						</div>
						<span className='text-xl'>x1</span>
					</li>

					<li className={'flex gap-2 justify-center items-center'}>
						<div className='p-[10px] aspect-square rounded text-white bg-blue-500 transition-transform text' title='Delete two wrong questions' disabled={true}>
							<Image src={fiftyImg.src} alt="fifty fifty" width={23} height={23} />
						</div>
						<span className='text-xl'>x1</span>
					</li>

					<li className={'flex gap-2 justify-center items-center'} title='Lives'>
						<div className='p-[10px] aspect-square rounded text-white bg-blue-500 transition-transform text' title='Delete two wrong questions'>
							<FaHeart color='white' className='text-2xl' />
						</div>
						<span className='text-xl'>x1</span>
					</li>
				</ul>
			</fieldset>

			{/* QUESTIONS */}
			<fieldset className='p-1 relative'>
				<legend className='text-lg font-semibold mb-2'>Questions</legend>
				<input onClick={handleInputs} defaultChecked={!queries.infinitymode} type="checkbox" name="infinitymode" className='absolute -top-8 left-28 w-5 h-5 cursor-pointer ' />
				<div className='flex items-center'>
					<input type="range" name="questions" min={quiziConfig.minQuestions} max={quiziConfig.maxQuestions} defaultValue={queries.questions} onChange={handleInputs} className={`w-full cursor-pointer ${queries.infinitymode ? 'grayscale cursor-not-allowed' : ''}`} disabled={nowQueries.infinitymode} />
					<span className={`w-11 flex justify-center font-semibold h-5 ${queries.infinitymode && 'text-[24px]'}`}>
						{queries.infinitymode ? <IoMdInfinite /> : nowQueries.questions}
					</span>
				</div>
			</fieldset>

			{/* TIME */}
			<fieldset className='p-1 relative'>
				<legend className='text-lg font-semibold mb-2'>Time</legend>
				<input onClick={handleInputs} defaultChecked={queries.timemode} type="checkbox" name="timemode" className='absolute -top-8 left-14 w-5 h-5 cursor-pointer ' />
				<div className='flex gap-3'>
					{
						[10, 20, 30, 60].map(time => (
							<label key={time} className="w-full">
								<input className='peer absolute hidden' type="radio" name="time" id={`${time}s`} value={time} defaultChecked={time === Number(queries.time)} onChange={handleInputs} disabled={!nowQueries.timemode} />
								<span className={`peer-checked:bg-blue-500 transition-colors  peer-checked:text-white px-2 sm:px-4 py-2 rounded mr-3 cursor-pointer bg-gray-200 text-center w-full inline-block ${!nowQueries.timemode ? 'grayscale cursor-not-allowed' : 'active:scale-95'}`} translate="no">{time}s</span>
							</label>
						))
					}
				</div>
			</fieldset>
		</div>
	)
}
