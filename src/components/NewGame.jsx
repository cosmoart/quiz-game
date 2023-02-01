import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IoCloseSharp } from 'react-icons/io5'
import categories from '../assets/categories.json'

export default function NewGame() {
	const router = useRouter()
	const dialog = useRef(null)

	const [queries, setQueries] = useState({
		mode: 'Classic',
		questions: 10,
		time: 20,
		categories: categories.map(category => category.id)
	});

	const query = Object.keys(queries).map(key => `${key}=${queries[key]}`).join('&')

	function handleInputs(e) {
		if (e.target.name === 'categories') {
			const categories = [...queries.categories]

			if (e.target.checked) categories.push(e.target.value)
			else categories.splice(categories.indexOf(e.target.value), 1)
			setQueries({ ...queries, categories })
		} else {
			setQueries({ ...queries, [e.target.name]: e.target.value })
		}
	}

	// CLOSE DIALOG:

	// Close dialog when click outside
	function clickOutsideDialog(e) {
		const rect = dialog.current.getBoundingClientRect()
		if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
			closeDialog()
		}
	}

	// Close dialog with animation
	function closeDialog() {
		dialog.current.classList.add('hide')
		function handleAnimationEnd() {
			dialog.current.classList.remove('hide')
			dialog.current.close()
			dialog.current.removeEventListener('animationend', handleAnimationEnd)
		}
		dialog.current.addEventListener('animationend', handleAnimationEnd)
	}

	return (
		<dialog ref={dialog} onClick={(e) => clickOutsideDialog(e)} id="newGameDialog" className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 m-0 backdrop-blur-lg rounded-md py-9 px-11'>
			<button
				className='absolute top-2 right-2 text-3xl'
				onClick={() => closeDialog()} >
				<IoCloseSharp />
			</button>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className='flex flex-col sm:flex-row gap-8 mb-8'>
					<div className='flex gap-5 flex-col'>

						<fieldset className='p-1'>
							<legend className='text-lg font-semibold mb-2'>Mode</legend>
							<div className='flex gap-3'>
								{
									['Classic', 'Time', 'Infinite'].map(mode => (
										<label key={mode} className="w-full">
											<input className='peer absolute hidden' type="radio" name="mode" id={mode} value={mode} defaultChecked={mode === 'Classic'} onChange={handleInputs} />
											<span className='peer-checked:bg-blue-500 transition-colors active:scale-95 py-2 rounded cursor-pointer bg-gray-200 w-full inline-block text-center peer-checked:text-white'>{mode}</span>
										</label>
									))
								}
							</div>
						</fieldset>

						<fieldset className='p-1'>
							<legend className='text-lg font-semibold mb-2'>Questions</legend>
							<div className='flex items-center'>
								<input type="range" name="questions" min="5" max="12" defaultValue={queries.questions} onChange={handleInputs} className="w-full cursor-pointer" disabled={queries.mode === 'Infinite'} />
								<span className='mx-3'>{queries.questions}</span>
							</div>
						</fieldset>

						<fieldset className='after:bg-red-500 p-1'>
							<legend className='text-lg font-semibold mb-2'>Time</legend>
							<div className='flex gap-3'>
								{
									[10, 20, 30, 60].map(time => (
										<label key={time} className="w-full">
											<input className='peer absolute hidden' type="radio" name="time" id={`${time}s`} value={time} defaultChecked={time === 20} onChange={handleInputs} disabled={queries.mode === 'Classic'} />
											<span className={`peer-checked:bg-blue-500 transition-colors  peer-checked:text-white px-2 sm:px-4 py-2 rounded mr-3 cursor-pointer bg-gray-200 text-center w-full inline-block ${queries.mode === 'Classic' ? "grayscale cursor-not-allowed" : "active:scale-95"}`}>{time}s</span>
										</label>
									))
								}
							</div>
						</fieldset>

					</div>
					<fieldset>
						<legend className='text-lg font-semibold mb-2 mx-1'>Categories</legend>
						<div className='grid grid-cols-4 sm:grid-cols-2 gap-5 sm:gap-2 h-full'>
							{
								categories.map(category => (
									<label key={category.id} className="relative cursor-pointer" title={category.name}>
										<input defaultChecked className="peer h-16 sm:h-auto block opacity-0" type="checkbox" name="categories" id={category.name} value={category.id} onChange={handleInputs} disabled={queries.categories.length === 1 && queries.categories.includes(category.id)} />
										<Image className={`absolute top-1/2 -translate-y-1/2 transition-all w-full peer-checked:scale-90 p-2 rounded peer-checked:bg-[${category.color}] invert peer-checked:invert-0 peer-checked:bg-[var(--bgColor)] top-0 pointer-events-none peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline outline-[var(--bgColor)]`} src={`/categories/${category.name.toLowerCase()}.svg`} alt={category.name} width={40} height={40} style={{ "--bgColor": category.color }} />
									</label>
								))
							}
						</div>
					</fieldset>

				</div>
				<button type='submit' className='btn-primary py-3 px-6 w-full' onClick={() => router.push(`/play?${query}`)}>New game</button>
			</form>
		</dialog >
	)
}