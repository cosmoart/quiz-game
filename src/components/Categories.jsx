import categories from "../assets/categories.json"
import Image from 'next/image'

export default function Categories() {
	return (
		<section className='max-w-6xl mx-auto'>
			<h2 className='text-2xl my-4'>Categories</h2>
			<nav>
				<ul className='grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
					{categories.map(category => (
						<li key={category.id} className="rounded p-5" style={{ backgroundColor: category.color }}>
							<Image className='invert' src={`/categories/${category.name.toLowerCase()}.svg`} alt="" width={30} height={30} />
							<h3 className='text-xl'>{category.name}</h3>
							<p className='text-sm'>{category.description}</p>
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}