import NewGameForm from './NewGameForm'

export default function Layout ({ children }) {
	return (
		<>
			{children}
			<NewGameForm />
		</>
	)
}
