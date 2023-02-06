import Image from 'next/image'
import { BiTime } from 'react-icons/bi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoInvertMode } from 'react-icons/io5'
import { AiFillInfoCircle } from 'react-icons/ai'
import categories from '@/assets/categories.json'
import { useState } from 'react'

export default function GameInfo({ queries }) {
	const [showInfo, setShowInfo] = useState(false);

	return (
		<>
			<button title={showInfo ? "Hidden info" : "Show info"} onClick={() => setShowInfo(showInfo => !showInfo)} className="fixed bottom-4 left-4 lg:hidden bg-white z-20 rounded-md p-1">
				<AiFillInfoCircle className='text-[28px] text-slate-900' />
			</button>
			<aside className={`fixed transition-all z-10 lg:bottom-4 left-4 md:top-1/2 md:-translate-y-1/2 text-center text-slate-900 font-medium lg:!scale-100 lg:!opacity-100 ${showInfo ? "bottom-12 scale-100 opacity-100" : "bottom-0 scale-20 opacity-0"}`}>
				<div>
					<div className='flex gap-2'>
						<div className='bg-white p-2 rounded-md'>
							<AiOutlineQuestionCircle className='text-xl inline-block' />{queries.questions}
						</div>
						<div className='bg-white p-2 rounded-md'>
							<BiTime className='text-xl inline-block' />{queries.time}
						</div>
					</div>
					<div className='bg-white p-2 rounded-md mt-2 flex justify-center gap-1 items-center'>
						<IoInvertMode className='text-xl inline-block' />{queries.mode}
					</div>
				</div>
				<div className='bg-white p-2 rounded-md mt-2 '>
					Categories:
					<div className='grid grid-cols-2 gap-2 mt-1 justify-items-center'>
						{queries.categories.map(category => {
							let cat = categories.find(cat => cat.id === category)
							return (
								<Image key={category} title={cat.name} alt={cat.name}
									className="p-1 rounded"
									style={{ backgroundColor: cat.color }}
									src={`/categories/${cat.name.toLowerCase()}.svg`}
									width={33} height={33} />
							)
						})
						}
					</div>
				</div>
			</aside>
		</>
	)
}