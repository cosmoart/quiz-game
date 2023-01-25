import Link from 'next/link'

export default function Main() {
	return (
		<main className='max-w-6xl mx-auto w-full min-h-[25rem] flex flex-col justify-center items-start px-5 bg-blue-600'>
			<h1 className='text-5xl'>Quizi</h1>
			<p>
				Answer questions and get points
			</p>
			<Link href="/play" className='rounded mt-3 inline-block py-3 px-5 bg-red-200'>Play</Link>
		</main>
	)
}