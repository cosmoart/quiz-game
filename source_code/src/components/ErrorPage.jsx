import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";

export default function ErrorPage({ errorQ }) {
	return (
		<div className="text-slate-900 mainHome rounded-md absolute top-0 left-0 w-screen h-screen cursor-progress text-center !bg-[length:30rem]">
			<main className='bg-white max-w-3xl px-5 mx-auto h-full py-4 flex items-center flex-col justify-center'>
				<BiErrorCircle className="text-8xl mb-4 text-red-500" />
				<h2 className='text-3xl'>
					<span className='text-blue-600'>{errorQ[1].statusCode || 500}:</span> {errorQ[1].body && errorQ[1].body.message || "Error occured"}
				</h2>
				<p className='text-xl my-2'>Ooops! Something went wrong. Please try again later.</p>
				<Link className='text-blue-600 underline text-lg' href='/'>
					<BiArrowBack className='inline-block text-2xl mr-2' />
					Go back to home
				</Link>
			</main>
		</div>
	)
}