import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IoCloseSharp } from 'react-icons/io5'
import categories from '../assets/categories.json'

export default function NewGame() {
	const router = useRouter()
	const dialog = useRef(null)
	const [queries, setQueries] = useState({
		questions: 10,
		time: 20,
		mode: 'classic',
		categories: categories.map(category => category.id)
	});

	// Transform object to query url string
	const query = Object.keys(queries).map(key => `${key}=${queries[key]}`).join('&')

	function handleInputs(e) {
		if (e.target.name === 'categories') {
			const categories = [...queries.categories]
			if (e.target.checked) {
				categories.push(e.target.value)
			} else {
				categories.splice(categories.indexOf(e.target.value), 1)
			}
			setQueries({ ...queries, categories })
		} else {
			setQueries({ ...queries, [e.target.name]: e.target.value })
		}
	}

	useEffect(() => {
		// document.addEventListener("click", e => {
		// 	if (dialog.current.open && !dialog.current.contains(e.target)) {
		// 		dialog.current.close()
		// 	}
		// });
	}, []);

	return (
		<dialog ref={dialog} id="newGameDialog" className='max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white m-0 backdrop-blur-lg rounded-md py-7 px-10'>
			<button
				className='absolute top-1 right-1 text-3xl'
				onClick={() => dialog.current.close()}>
				<IoCloseSharp />
			</button>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className='flex flex-row gap-8 mb-8'>
					<div className='flex gap-5 flex-col'>
						<fieldset>
							<legend className='text-lg font-semibold mb-2'>Mode</legend>
							<label>
								<input className='peer absolute' type="radio" name="mode" id="classic" value="classic" defaultChecked onChange={handleInputs} />
								<span className='peer-checked:bg-blue-500 px-4 py-2 rounded mr-3 cursor-pointer'>Classic</span>
							</label>
							<label>
								<input className='peer absolute' type="radio" name="mode" id="time" value="time" onChange={handleInputs} />
								<span className='peer-checked:bg-blue-500 px-4 py-2 rounded mr-3 cursor-pointer'>Time</span>
							</label>
							<label>
								<input className='peer absolute' type="radio" name="mode" id="infinite" value="infinite" onChange={handleInputs} />
								<span className='peer-checked:bg-blue-500 px-4 py-2 rounded mr-3 cursor-pointer'>Infinite</span>
							</label>
						</fieldset>

						<fieldset>
							<legend className='text-lg font-semibold'>Questions</legend>
							<div className='flex'>
								<input type="range" name="questions" min="5" max="12" defaultValue={queries.questions} onChange={handleInputs} className="w-full cursor-pointer" />
								<span className='mx-3'>{queries.questions}</span>
							</div>
						</fieldset>

						<fieldset>
							<legend className='text-lg font-semibold'>Time</legend>
							{
								[10, 20, 30, 60].map(time => (
									<label key={time}>
										<input className='peer absolute' type="radio" name="time" id={`${time}s`} value={time} onChange={handleInputs} />
										<span className='peer-checked:bg-blue-500 px-4 py-2 rounded mr-3 cursor-pointer'>{time}s</span>
									</label>
								))
							}
						</fieldset>

					</div>
					<fieldset>
						<legend className='text-lg font-semibold'>Categories</legend>
						<div className='grid grid-cols-2 gap-3'>
							{
								categories.map(category => (
									<label key={category.id} className="relative">
										<input defaultChecked className="peer w-8 h-8 block opacity-0  cursor-pointer " type="checkbox" name="categories" id={category.name} value={category.id} onChange={handleInputs} />
										<Image className={`absolute peer-checked:scale-90 p-2 rounded peer-checked:bg-[${category.color}] peer-checked:bg-blue-500 top-0 pointer-events-none`} src={`/categories/${category.name.toLowerCase()}.svg`} title={category.name} alt={category.name} width={40} height={40} />
									</label>
								))
							}
						</div>
					</fieldset>
				</div>
				<button type='submit' className='bg-blue-600 text-white py-3 px-6 rounded-sm w-full uppercase' onClick={() => router.push(`/play?${query}`)}>New game</button>
			</form>
		</dialog>
	)
}