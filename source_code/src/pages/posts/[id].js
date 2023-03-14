import { useRouter } from 'next/router'

function Post ({ post }) {
	const router = useRouter()

	if (router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	)
}

export async function getServerSideProps ({ params }) {
	const post = {
		title: 'Fallback title',
		body: 'Fallback body'
	}
	// After 5 seconds, the page will be rendered with the fallback content
	await new Promise(resolve => setTimeout(resolve, 5 * 1000))

	return { props: { post } }

	// Fetch data from external API
	// const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
	// const post = await res.json()

	// Pass data to the page via props
	// return { props: { post } }
}

export default Post
