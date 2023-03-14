import { useState, createContext } from 'react'

const WildcardsContext = createContext()

function WildcardsProvider ({ children }) {
	const [wildCards, setWildCards] = useState({
		skip: 1,
		half: 1,
		lives: 1
	})

	function subtractWildcard (type) {
		setWildCards(prevState => ({
			...prevState,
			[type]: prevState[type] - 1
		}))
	}

	return (
		<WildcardsContext.Provider value={{ wildCards, subtractWildcard }}>
			{children}
		</WildcardsContext.Provider>
	)
}

export { WildcardsContext, WildcardsProvider }
