import PlayHeader from '@/components/Play/PlayHeader'
import GameInfo from '@/components/Play/GameInfo'
import Footer from '@/components/PageFooter'
import QuestionsMain from '@/components/Questions/QuestionsMain'
import { WildcardsProvider } from '@/context/WildcardsContext'

export default function PlayHome ({ questions }) {
	return (
		<>
			<PlayHeader />
			<GameInfo />
			<WildcardsProvider>
				<QuestionsMain ques={questions} />
			</WildcardsProvider>
			<Footer alert={true} />
			<style jsx global>
				{`
							body {
								background: url(play_bg.png) center;
								background-size: 100% 100%;
							}
							@media (max-width: 1030px) {
								body {
									background-size: auto 100%;
								}
							}
						`}
			</style>
		</>
	)
}
