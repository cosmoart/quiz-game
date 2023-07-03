import { create } from 'zustand'
import { useWildcardsStore } from './useWildcards'
import { useQueriesStore } from './useQueries'
import { useQuestionsStore } from './useQuestions'

export const useBoundStore = create((...a) => ({
	...useWildcardsStore(...a),
	...useQueriesStore(...a),
	...useQuestionsStore(...a)
}))
