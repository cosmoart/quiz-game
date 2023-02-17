import NewGame from './NewGame'

export default function Layout ({ children }) {
	return (
		<>
			{children}
			<NewGame />
		</>
	)
}
