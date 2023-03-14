export default function playSound (sound, volume) {
	if (localStorage.getItem('sound') === 'true') {
		const audio = new Audio(`/sounds/${sound}.mp3`)
		audio.volume = volume || 0.25
		audio.play()
	}
}
