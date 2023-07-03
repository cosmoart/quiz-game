import Image from 'next/image'
import { AiFillInfoCircle } from 'react-icons/ai'
import categories from '@/assets/categories.json'
import { useState } from 'react'
import { useBoundStore } from '@/store/useBoundStore'

export default function GameInfo () {
	const { queries } = useBoundStore(state => state)
	const [showInfo, setShowInfo] = useState(false)

	const mode = queries.timemode && queries.infinitymode ? 'Time | Infinity' : !queries.timemode && !queries.infinitymode ? 'Classic' : queries.timemode ? 'Time' : 'Infinity'

	return (
		<>
			<button title={showInfo ? 'Hidden info' : 'Show info'} onClick={() => setShowInfo(showInfo => !showInfo)} className="fixed bottom-4 top left-4 lg:hidden bg-white z-20 rounded-md p-1">
				<AiFillInfoCircle className='text-[28px] text-slate-900' />
			</button>

			<aside className={`fixed h-fit transition-all z-10 lg:bottom-4 left-4 md:top-1/2 md:-translate-y-1/2 text-center text-slate-900 font-medium lg:!scale-100 lg:!opacity-100 ${showInfo ? 'bottom-12 scale-100 opacity-100' : 'bottom-0 scale-20 opacity-0'}`}>
				<div className='flex gap-2'>
					{
						!queries.infinitymode && <span className='bg-white p-2 rounded-md text-sm w-full pt-[9px] grid place-items-center' title='Number of questions'>
							{queries.questions}
						</span>
					}
					{
						queries.timemode && <span className='bg-white p-2 rounded-md text-sm w-full pt-[9px] grid place-items-center' title='Time'>
							{queries.time}
						</span>
					}
				</div>
				<div className='bg-white p-2 rounded-md mt-2 flex justify-center gap-1 items-center' title='Mode'>
					<span className='pt-[2px]'>{mode}</span>
				</div>
				<div className='bg-white p-2 rounded-md mt-2 grid grid-cols-2 gap-2 justify-items-center'>
					{queries.categories.map(category => {
						const cat = categories.find(cat => cat.id === category)
						return <Image key={category} title={cat.name} alt={cat.name}
							className="p-1 rounded"
							style={{ backgroundColor: cat.color }}
							src={`/categories-icons/${cat.name.toLowerCase()}.svg`}
							width={33} height={33}
						/>
					})}
				</div>
			</aside>

			<style jsx global>
				{`
				#__next {
					background: linear-gradient(0deg, rgb(0 0 0 / 10%) 0%, rgba(255, 255, 255, 0.05) 100%);
				}
				`}
			</style>
		</>
	)
}
