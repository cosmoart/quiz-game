import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { IoCloseSharp } from 'react-icons/io5'
import { BsSkipEndFill } from 'react-icons/bs'
import { IoMdInfinite } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import categories from '../assets/categories.json'
import fiftyImg from '@/assets/fifty.svg'

import queryValidator, { quiziConfig } from '@/helpers/gameConfig'

export default function NewGame () {
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
			<form onSubmit={(e) => e.preventDefault()}>
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8'>
					<div className='flex gap-2 sm:gap-5 flex-col'>

						<fieldset className='p-1'>
							<legend className='text-lg font-semibold mb-2'>Wilcards</legend>
							<ul className='flex gap-3 justify-between'>
								<li className={'flex gap-2 justify-center items-center'}>
									<div className='p-[10px] aspect-square rounded bg-blue-500 transition-transform' title='Skip question' disabled={true < 1}>
										<BsSkipEndFill color='white' className='text-2xl' />
									</div>
									<span className='text-xl'>x1</span>
								</li>

								<li className={'flex gap-2 justify-center items-center'}>
									<div className='p-[10px] aspect-square rounded text-white bg-blue-500 transition-transform text' title='Delete two wrong questions' disabled={true}>
										<Image src={fiftyImg.src} alt="fifty fifty" width={23} />
									</div>
									<span className='text-xl'>x1</span>
								</li>

								<li className={'flex gap-2 justify-center items-center'} title='Lives'>
									<div className='p-[10px] aspect-square rounded text-white bg-blue-500 transition-transform text' title='Delete two wrong questions'>
										<FaHeart color='white' className='text-2xl' />
									</div>
									<span className='text-xl'>x1</span>
								</li>
							</ul>
						</fieldset>

						<fieldset className='p-1 relative'>
							<legend className='text-lg font-semibold mb-2'>Questions</legend>
							<input onClick={handleInputs} defaultChecked={!queries.infinitymode} type="checkbox" name="infinitymode" className='absolute -top-8 left-28 w-5 h-5 cursor-pointer ' />
							<div className='flex items-center'>
								<input type="range" name="questions" min={quiziConfig.minQuestions} max={quiziConfig.maxQuestions} defaultValue={queries.questions} onChange={handleInputs} className={`w-full cursor-pointer ${queries.infinitymode ? 'grayscale cursor-not-allowed' : ''}`} disabled={queries.infinitymode} />
								<span className={`w-11 flex justify-center font-semibold h-5 ${queries.infinitymode && 'text-[24px]'}`}>
									{queries.infinitymode ? <IoMdInfinite /> : queries.questions}
								</span>
							</div>
						</fieldset>

						<fieldset className='after:bg-red-500 p-1 relative'>
							<legend className='text-lg font-semibold mb-2'>Time</legend>
							<input onClick={handleInputs} defaultChecked={queries.timemode} type="checkbox" name="timemode" className='absolute -top-8 left-14 w-5 h-5 cursor-pointer ' />
							<div className='flex gap-3'>
								{
									[10, 20, 30, 60].map(time => (
										<label key={time} className="w-full">
											<input className='peer absolute hidden' type="radio" name="time" id={`${time}s`} value={time} defaultChecked={time === Number(queries.time)} onChange={handleInputs} disabled={!queries.timemode} />
											<span className={`peer-checked:bg-blue-500 transition-colors  peer-checked:text-white px-2 sm:px-4 py-2 rounded mr-3 cursor-pointer bg-gray-200 text-center w-full inline-block ${!queries.timemode ? 'grayscale cursor-not-allowed' : 'active:scale-95'}`} translate="no">{time}s</span>
										</label>
									))
								}
							</div>
						</fieldset>
					</div>

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
