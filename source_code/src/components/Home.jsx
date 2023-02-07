import categories from "../assets/categories.json"
import Footer from './Footer';

export default function Main() {

	function handleTitleHover(t) {
		const target = document.getElementById(t);
		target.classList.add('jello-vertical');
		target.style.color = categories[Math.floor(Math.random() * categories.length)].color;

		target.addEventListener('animationend', () => {
			target.classList.remove('jello-vertical');
		});
	}

	function handleTitleLeave(t) {
		document.getElementById(t).style.color = 'white';
	}

	return (
		<main className='mainHome max-w-6xl relative  mx-auto w-full min-h-[25rem] flex gap-4 flex-col justify-between items-center px-5 md:px-10 py-20 lg:col-start-2 lg:row-start-1 lg:row-end-3 text-center text-white'>
			<div>
				<h1 className='text-8xl font-medium w-full uppercase z-10 relative' translate='no'>
					{"Quizi".split("").map((letter, index) => (
						<span key={index} id={letter + index + 10} className='relative inline-block transition-all duration-300' onMouseEnter={() => handleTitleHover(letter + index + 10)} onMouseLeave={() => handleTitleLeave(letter + index + 10)}>
							{letter}
						</span>
					))}
				</h1>
				<div className='bg-[#1c233a] absolute w-full lg:w-[41.7vw] h-40 top-16 left-0'></div>
				<p className='mb-20 relative'>
					Play an infinite number of possible questions!
				</p>
			</div>
			<button onClick={() => document.getElementById("newGameDialog").showModal()} id='play' href="play" className='btn-primary uppercase px-6 py-4 text-lg max-w-md w-full mx-auto mt-10'>Play</button>
			<Footer />
		</main >
	)
}