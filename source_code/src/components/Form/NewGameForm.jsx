import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import LeftForm from './LeftForm'
import { IoCloseSharp } from 'react-icons/io5'
import playSound from '@/helpers/playSound'
import queryValidator from '@/helpers/gameConfig'
import categoriesJSON from '@/assets/categories.json'
import { useBoundStore } from '@/store/useBoundStore'

export default function NewGameForm () {
	const { getQuestions, cleanQuestions, queries, setQueries, cleanWildCards } = useBoundStore(state => state)
	const [nowQueries, setNowQueries] = useState(queries)
	const router = useRouter()
	const dialog = useRef(null)

	useEffect(() => setNowQueries(queries), [queries])

	useEffect(() => {
		if (router.isReady && router.pathname === '/play') {
			setQueries(queryValidator(router.query))
		}
	}, [router.isReady])

	function handleInputs (e) {
		if (e.target.name === 'infinitymode' || e.target.name === 'timemode') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')
			return setNowQueries({ ...nowQueries, [e.target.name]: e.target.name === 'infinitymode' ? !e.target.checked : e.target.checked })
		}

		if (e.target.name === 'categories') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')
			return setNowQueries({ ...nowQueries, [e.target.name]: e.target.checked ? [...nowQueries.categories, e.target.value] : nowQueries.categories.filter(cat => cat !== e.target.value) })
		}

		playSound('pop')
		setNowQueries({ ...nowQueries, [e.target.name]: e.target.value })
	}

	function handleSubmit (e) {
		e.preventDefault()
		cleanQuestions()
		cleanWildCards()

		const query = Object.keys(nowQueries).map(key => `${key}=${nowQueries[key]}`).join('&')
		setQueries(queryValidator(nowQueries))
		router.push({ pathname: '/play', query })

		const cate = nowQueries.categories.map(cat => categoriesJSON.find(c => c.id === cat).name)
		if (router.pathname === '/play') getQuestions(cate, nowQueries.infinitymode ? 5 : nowQueries.questions)

		closeDialog()
	}

	function clickOutsideDialog (e) {
		const rect = dialog.current.getBoundingClientRect()
		if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
			closeDialog()
		}
	}

	function closeDialog () {
		playSound('pop-down')
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
			<button className='absolute top-2 right-2 text-3xl hover:scale-110 transition-all' onClick={closeDialog} >
				<IoCloseSharp />
			</button>

			<form onSubmit={(e) => e.preventDefault()} >
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8'>

					<LeftForm handleInputs={handleInputs} nowQueries={nowQueries} />

					<fieldset>
						<legend className='text-lg font-semibold mb-2 mx-1'>
							Categories
						</legend>
						<div className='grid grid-cols-4 sm:grid-cols-2 gap-y-0 gap-x-3 sm:gap-2 h-full'>
							{
								categoriesJSON.map(category => (
									<label key={category.id} className="relative cursor-pointer" title={category.name}>
										<input
											defaultChecked={queries.categories.includes(category.id)}
											className="peer relative opacity-0 w-full h-full block cursor-pointer"
											type="checkbox" name="categories" id={category.name} value={category.id} onClick={handleInputs}
											disabled={queries.categories.length === 1 && queries.categories.includes(category.id)}
										/>

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
