import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import categories from '../assets/categories.json'

export default function Play() {
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

	return (
		<>
			<dialog ref={dialog} className='max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-full bg-white rounded-md p-5'>
				<button
					className='absolute top-0 right-0 text-xl'
					onClick={() => dialog.current.close()}>
					X
				</button>
				<form onSubmit={(e) => e.preventDefault()}>
					<div className='flex flex-row gap-5'>
						<div>
							<fieldset>
								<legend>Questions</legend>
								<label>
									5
									<input type="radio" name="questions" id="5" value="5" onChange={handleInputs} />
								</label>
								<label>
									10
									<input type="radio" name="questions" id="10" value="10" defaultChecked onChange={handleInputs} />
								</label>
							</fieldset>

							<fieldset>
								<legend>Time</legend>
								{
									[10, 20, 30, 60].map(time => (
										<label key={time}>
											{time}s
											<input type="radio" name="time" id={`${time}s`} value={time} onChange={handleInputs} />
										</label>
									))
								}
							</fieldset>

							<fieldset>
								<legend>Mode</legend>
								<label>
									Classic
									<input type="radio" name="mode" id="classic" value="classic" defaultChecked onChange={handleInputs} />
								</label>
								<label>
									Time
									<input type="radio" name="mode" id="time" value="time" onChange={handleInputs} />
								</label>
								<label>
									Infinite
									<input type="radio" name="mode" id="infinite" value="infinite" onChange={handleInputs} />
								</label>
							</fieldset>

						</div>
						<fieldset>
							<legend>Categories</legend>
							<div className='grid grid-cols-2'>
								{
									categories.map(category => (
										<label key={category.id} className="relative">
											<input defaultChecked className="peer w-8 h-8 block opacity-0  cursor-pointer " type="checkbox" name="categories" id={category.name} value={category.id} onChange={handleInputs} />
											<Image className='invert absolute peer-checked:scale-75 peer-checked:bg-red-300 top-0 pointer-events-none' src={`/categories/${category.name.toLowerCase()}.svg`} alt="" width={30} height={30} />
										</label>
									))
								}
							</div>
						</fieldset>
					</div>
					<button type='submit' className='bg-blue-400 py-3 px-6 rounded-sm' onClick={() => router.push(`/play?${query}`)}>PLAY</button>
				</form>
			</dialog>
			<button onClick={() => dialog.current.show()} id='play' href="play" className='px-6 py-5 text-center rounded-md bg-blue-500 max-w-xl w-full mx-auto mt-10 mb-28 uppercase'>New game</button>
		</>
	)
}