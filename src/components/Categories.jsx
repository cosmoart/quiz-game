import categories from "../assets/categories.json"
import Image from 'next/image'

export default function Categories() {
	return (
		<section className='max-w-6xl md:mx-auto px-8 py-6 flex flex-col justify-center'>
			<h2 className='text-2xl mb-4'>Categories</h2>
			<nav>
				<ul className='grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-5'>
					{categories.map(category => (
						<li key={category.id} className="rounded p-5 flex flex-col gap-1 items-center justify-center" style={{ backgroundColor: category.color }}>
							<Image className='invert' src={`/categories/${category.name.toLowerCase()}.svg`} alt="" width={30} height={30} />
							<h3 className='text-xl text-center'>{category.name}</h3>
							{/* <p className='text-sm'>{category.description}</p> */}
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}