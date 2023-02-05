import Image from 'next/image'
import { BiTime } from 'react-icons/bi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoInvertMode } from 'react-icons/io5'
import categories from '@/assets/categories.json'

export default function GameInfo({ queries }) {
	return (
		<aside className='absolute left-5 top-1/2 -translate-y-1/2 text-center text-slate-900 font-medium'>
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
					{queries.categories && queries.categories.map(category => {
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
	)
}