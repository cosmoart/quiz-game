import { defaultQuery } from '@/helpers/gameConfig'

export const useQueriesStore = (set) => ({
	queries: defaultQuery,
	setQueries: (queries) => set({ queries })
})
