import { createContext, useEffect, useState } from 'react'
import queryValidator, { quiziConfig } from '@/helpers/gameConfig'
const QueriesContext = createContext()

function QueriesProvider ({ children }) {
	const [queries, setQueries] = useState(queryValidator({}))

	useEffect(() => {
		if (localStorage.getItem('quiziConfig')) {
			const config = JSON.parse(localStorage.getItem('quiziConfig'))
			setQueries(config)
		} else {
			setQueries(quiziConfig)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('quiziConfig', JSON.stringify(queries))
	}, [queries])

	return (
		<QueriesContext.Provider value={{ queries, setQueries }}>
			{children}
		</QueriesContext.Provider>
	)
}

export { QueriesContext, QueriesProvider }
