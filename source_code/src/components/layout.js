import { QueriesProvider } from '@/hooks/QueriesContext'
import NewGameForm from './Form/NewGameForm'

export default function Layout ({ children }) {
	return (
		<QueriesProvider>
			{children}
			<NewGameForm />
		</QueriesProvider>
	)
}
