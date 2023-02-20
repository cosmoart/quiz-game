import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import queryValidator, { quiziConfig } from '@/helpers/gameConfig'
import { IoCloseSharp } from 'react-icons/io5'
import categories from '@/assets/categories.json'
import LeftFormSection from './LeftFormSection'

export default function NewGameForm () {
	const router = useRouter()
	const dialog = useRef(null)
	const [queries, setQueries] = useState(queryValidator({}))

	const query = Object.keys(queries).map(key => `${key}=${queries[key]}`).join('&')

	// LOCAL STORAGE:
	useEffect(() => {
		if (localStorage.getItem('quiziConfig')) {
			const config = JSON.parse(localStorage.getItem('quiziConfig'))
			setQueries(config)
		} else {
			localStorage.setItem('quiziConfig', JSON.stringify(quiziConfig))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('quiziConfig', JSON.stringify(queries))
	}, [queries])

	// HANDLE FORM INPUTS:
	function handleInputs (e) {
		if (e.target.name === 'infinitymode' || e.target.name === 'timemode') {
			return setQueries({ ...queries, [e.target.name]: e.target.name === 'infinitymode' ? !e.target.checked : e.target.checked })
		}

		if (e.target.name === 'categories') {
			return setQueries({ ...queries, [e.target.name]: e.target.checked ? [...queries.categories, e.target.value] : queries.categories.filter(cat => cat !== e.target.value) })
		}

		setQueries({ ...queries, [e.target.name]: e.target.value })
	}

	function handleSubmit (e) {
		e.preventDefault()
		router.push(`/play?${query}`)
		closeDialog()
	}

	// CLOSE DIALOG:
	function clickOutsideDialog (e) {
		const rect = dialog.current.getBoundingClientRect()
		if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
			closeDialog()
		}
	}

	function closeDialog () {
		dialog.current.classList.add('hide')
		function handleAnimationEnd () {
			dialog.current.classList.remove('hide')
			dialog.current.close()
			dialog.current.removeEventListener('animationend', handleAnimationEnd)
		}
		dialog.current.addEventListener('animationend', handleAnimationEnd)
	}

	return (
		<dialog ref={dialog} onClick={(e) => clickOutsideDialog(e)} id="newGameDialog" className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-slate-900 m-0 backdrop-blur-lg rounded-md py-9 px-11'>
			<button className='absolute top-2 right-2 text-3xl' onClick={() => closeDialog()} >
				<IoCloseSharp />
			</button>
			<form onSubmit={(e) => e.preventDefault()} >
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8'>
					<LeftFormSection queries={queries} handleInputs={handleInputs} quiziConfig={quiziConfig} />
					<fieldset>
						<legend className='text-lg font-semibold mb-2 mx-1'>Categories</legend>
						<div className='grid grid-cols-4 sm:grid-cols-2 gap-y-0 gap-x-3 sm:gap-2 h-full'>
							{
								categories.map(category => (
									<label key={category.id} className="relative cursor-pointer" title={category.name}>
										<input defaultChecked={queries.categories.includes(category.id)} className="peer h-16 sm:h-auto block opacity-0" type="checkbox" name="categories" id={category.name} value={category.id} onClick={handleInputs} disabled={queries.categories.length === 1 && queries.categories.includes(category.id)} />

										<Image className={`absolute transition-all w-full peer-checked:scale-90 p-2 rounded peer-checked:bg-[${category.color}] invert peer-checked:invert-0 peer-checked:bg-[var(--bgColor)] top-0 pointer-events-none peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline outline-[var(--bgColor)]`} src={`/categories-icons/${category.name.toLowerCase()}.svg`} alt={category.name} width={40} height={40} style={{ '--bgColor': category.color }} />
									</label>
								))
							}
						</div>
					</fieldset>
				</div>
				<button type='submit' className='btn-primary uppercase py-3 px-6 w-full tracking-widest' onClick={(e) => handleSubmit(e)}>New game</button>
			</form>
		</dialog >
	)
}
