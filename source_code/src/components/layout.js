import NewGameForm from './Form/NewGameForm'

export default function Layout ({ children }) {
	return (
		<>
			{children}
			<NewGameForm />
		</>
	)
}
