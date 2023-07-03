export default function playSound (sound, volume = 0.25) {
	if (localStorage.getItem('sound') === 'true') {
		const audio = new Audio(`/sounds/${sound}.mp3`)
		audio.volume = volume
		audio.play()
	}
}
