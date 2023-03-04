import queryValidator, { quiziConfig } from '@/helpers/gameConfig'
import { useEffect, useState } from 'react'

export default function useQueries () {
	const [queries, setQueries] = useState(queryValidator({}))
	const query = Object.keys(queries).map(key => `${key}=${queries[key]}`).join('&')

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

	return [queries, setQueries, query]
}
