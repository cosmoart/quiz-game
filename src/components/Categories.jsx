import categories from "../assets/categories.json"
import Image from 'next/image'

export default function Categories() {
	function handleHover(color) {
		console.log("hover");
		document.body.style.backgroundColor = color
	}
	function handleLeave() {
		console.log("leave");
		document.body.style.backgroundColor = 'white'
	}

	return (
		<section className='max-w-6xl px-8 pb-6 flex flex-col justify-center text-slate-900'>
			<h2 className='text-2xl mb-4 font-medium mt-4 lg:mt-0'>Categories</h2>
			<nav>
				<ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-2 gap-3 md:gap-5'>
					{categories.map(category => (
						<li key={category.id} onMouseEnter={() => handleHover(category.color)}
							onMouseLeave={() => handleLeave()}
							className="rounded hover:scale-[1.03] transition-transform max-w-xs p-5 flex flex-col gap-1 items-center justify-center shadow-sm" style={{ backgroundColor: category.color }}>
							<Image className='drop-shadow-lg' src={`/categories/${category.name.toLowerCase()}.svg`} alt="" width={30} height={30} />
							<h3 className='text-lg mt-1 text-center text-white drop-shadow-md'>{category.name}</h3>
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}