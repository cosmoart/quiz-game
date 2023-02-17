import categories from '@/assets/categories.json'
import Image from 'next/image'

export default function Categories () {
	return (
		<section className='max-w-6xl bg-white px-8 pb-6 flex flex-col justify-center text-slate-900'>
			<h2 className='text-2xl mb-4 font-medium mt-4 lg:mt-0'>Categories</h2>
			<ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-2 gap-3 md:gap-5'>
				{categories.map(category => (
					<li key={category.id} title={category.name} className={`rounded outline-2 outline outline-offset-2 outline-slate-800 hover:outline-offset-4 outline-[${category.color}] hover:scale-[1.03] transition-transform max-w-xs p-5 flex flex-col gap-1 items-center justify-center shadow-sm`} style={{ backgroundColor: category.color, outlineColor: category.color }}>
						<Image className='drop-shadow-lg' src={`/categories-icons/${category.name.toLowerCase()}.svg`} alt="" width={30} height={30} />
						<h3 className='text-lg mt-1 text-center text-white drop-shadow-md'>{category.name}</h3>
					</li>
				))}
			</ul>
		</section>
	)
}
