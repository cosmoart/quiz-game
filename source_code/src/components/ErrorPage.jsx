export default function ErrorPage(errorQ) {
	return (
		<div className="text-slate-900 bg-white rounded-md px-6 py-4 text-2xl flex items-center justify-center flex-col absolute top-0 left-0 w-screen h-screen cursor-progress text-center">
			<h2>
				{errorQ[1].statusCode || 500}: {errorQ[1].body && errorQ[1].body.message || "Error occured"}</h2>
			<p>Ooops! Something went wrong. Please try again later.</p>
			<Link className='text-blue-600 underline text-lg' href='/'>Go back to home</Link>
		</div>
	)
}