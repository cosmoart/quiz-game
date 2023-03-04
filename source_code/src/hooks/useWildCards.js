import { useState } from 'react'

export default function useWildCards () {
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

	return [wildCards, subtractWildcard]
}
