import Image from 'next/image'
import { defaultQuestions } from '@/helpers/gameConfig'
import { BsSkipEndFill } from 'react-icons/bs'
import { IoMdInfinite } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import fiftyImg from '@/assets/fifty.svg'
import categoriesJSON from '@/assets/categories.json'
import { useBoundStore } from '@/store/useBoundStore'

export default function JsxForm ({ handleInputs, nowQueries }) {
	const { queries } = useBoundStore(state => state)

	const WILCARDS = [
		{ name: 'Skip question', icon: <BsSkipEndFill color='white' className='text-2xl' />, amount: 1 },
		{ name: 'Delete two wrong questions', icon: <Image src={fiftyImg.src} alt="fifty fifty" width={23} height={23} />, amount: 1 },
		{ name: 'Lives', icon: <FaHeart color='white' className='text-2xl' />, amount: 1 }
	]

	return (
		<>
			<div className='flex gap-2 sm:gap-5 flex-col'>
				<fieldset className='p-1'>
					<legend className='text-lg font-semibold mb-2'>Wilcards</legend>
					<ul className='flex gap-3 justify-between font-medium'>
						{
							WILCARDS.map(({ name, icon, amount }) => (
								<li key={name} className={'flex gap-2 justify-center items-center'}>
									<div className='p-[10px] aspect-square rounded text-white bg-blue-500 transition-transform text' title={name}>
										{icon}
									</div>
									<span className='text-xl'>x{amount}</span>
								</li>
							))
						}
					</ul>
				</fieldset>

				<fieldset className='p-1 relative'>
					<legend className='text-lg font-semibold mb-2'>Questions</legend>

					<div className="cntr shadow-sm" >
						<input id="cbx" onClick={handleInputs} defaultChecked={!nowQueries.infinitymode} type="checkbox" name="infinitymode" className='w-5 h-5 absolute top-[2px] left-[2px]' />
						<label htmlFor="cbx" className="cbx" title={nowQueries.infinitymode ? 'Classic mode' : 'Infinity mode'}></label>
					</div>

					<div className='flex items-center'>
						<input type="range" name="questions" min={defaultQuestions.minQuestions} max={defaultQuestions.maxQuestions} defaultValue={nowQueries.questions} onChange={handleInputs} className={`w-full cursor-pointer ${nowQueries.infinitymode ? 'grayscale cursor-not-allowed' : ''}`} disabled={nowQueries.infinitymode} />

						<span className={`ml-4 flex justify-center font-semibold h-5 ${nowQueries.infinitymode && 'text-[24px]'}`}>
							{nowQueries.infinitymode ? <IoMdInfinite /> : nowQueries.questions}
						</span>
					</div>
				</fieldset>

				<fieldset className='p-1 relative'>
					<legend className='text-lg font-semibold mb-2'>Time</legend>

					<div className="cntr shadow-sm !left-14" >
						<input id="cbx2" onClick={handleInputs} defaultChecked={nowQueries.timemode} type="checkbox" name="timemode" className='w-5 h-5 absolute top-[2px] left-[2px]' />
						<label htmlFor="cbx2" className="cbx2" title={nowQueries.timemode ? 'Disable time mode' : 'Enable time mode'}></label>
					</div>

					<div className='flex gap-3'>
						{[10, 20, 30, 60].map(time => (
							<label key={time} className="w-full">
								<input className='peer absolute hidden' type="radio" name="time" id={`${time}s`} value={time} defaultChecked={time === Number(nowQueries.time)} onChange={handleInputs} disabled={!nowQueries.timemode} />
								<span className={`peer-checked:bg-blue-500 transition-colors  peer-checked:text-white px-2 sm:px-4 py-2 rounded mr-3 cursor-pointer bg-gray-200 text-center w-full inline-block ${!nowQueries.timemode ? 'grayscale cursor-not-allowed' : 'active:scale-95'}`} translate="no">{time}s</span>
							</label>
						))}
					</div>
				</fieldset>
			</div>

			<fieldset>
				<legend className='text-lg font-semibold mb-2 mx-1'>Categories</legend>

				<div className='grid grid-cols-4 sm:grid-cols-2 gap-2 h-full'>
					{categoriesJSON.map(category => (
						<label key={category.id} className="relative cursor-pointer" title={category.name}>
							<input
								defaultChecked={queries.categories.includes(category.id)}
								className="peer relative h-16 opacity-0 w-full md:h-full block cursor-pointer"
								type="checkbox" name="categories" id={category.name} value={category.id} onClick={handleInputs}
								disabled={queries.categories.length === 1 && queries.categories.includes(category.id)}
							/>

							<Image className={`absolute transition-all w-full h-full peer-checked:scale-90 p-2 rounded peer-checked:bg-[${category.color}] invert peer-checked:invert-0 peer-checked:bg-[var(--bgColor)] top-0 pointer-events-none peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline outline-[var(--bgColor)]`} src={`/categories-icons/${category.name.toLowerCase()}.svg`} alt={category.name} width={40} height={40} style={{ '--bgColor': category.color }} />
						</label>
					))}
				</div>
			</fieldset>
		</>
	)
}
