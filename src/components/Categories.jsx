import Link from 'next/link'

export default function Categories() {
	const Categories = ["History", "Entertainment", "Technology", "Geography", "Literature", "Space", "General culture", "Cinema"]

	const Descriptions = {
		"History": "The study of past events, including political, economic, social, and cultural developments.",
		"Entertainment": "Activities or forms of media that provide enjoyment and amusement, such as movies, music, and sports.",
		"Technology": "The application of scientific knowledge for practical purposes, especially in industry.",
		"Geography": "The study of the Earth's surface, its features, and the distribution of life on it, including human and physical geography.",
		"Literature": "The body of written works of a language, period, or culture, including poetry, novels, and plays.",
		"Space": "The vast expanse that exists beyond the Earth's atmosphere, including the study of celestial bodies and phenomena",
		"General culture": "Can cover a wide range of topics, knowledge and disciplines, such as biology, zoology, science, art, literature and more.",
		"Cinema": "The art of making motion pictures, including the techniques of film production, cinematography, screenwriting, and editing."
	}

	const Colors = {
		"History": "bg-amber-200",
		"Entertainment": "bg-slate-800",
		"Technology": "bg-blue-600",
		"Geography": "bg-green-600",
		"Literature": "bg-purple-600",
		"Space": "bg-indigo-600",
		"General culture": "bg-yellow-600",
		"Cinema": "bg-red-600"
	}

	return (
		<section className='max-w-6xl mx-auto my-14'>
			<h2 className='text-2xl my-4'>Categories</h2>
			<nav>
				<ul className='grid grid-cols-4 gap-4'>
					{Categories.map((category, i) => (
						<li key={i} className={`${Colors[category]} rounded p-3`}>
							<Link href="/play">
								<h3 className='text-xl'>{category}</h3>
								<p className='text-sm'>{Descriptions[category]}</p>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}