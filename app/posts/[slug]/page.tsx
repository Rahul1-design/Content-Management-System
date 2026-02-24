async function getPost(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`, { cache: 'no-store' })
    const data = await res.json();
    return data.post
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)
    const formattedDate = new Date(post.createdAt)
        .toISOString()
        .split("T")[0]

    if (!post) return <div className="text-red-700 font-semibold text-4xl ">Post not found</div>

    return (
        <article className="max-w-3xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-500 mb-8">
                By {post.author?.name} • {formattedDate}
            </div>
            <div className="prose max-w-none">{post.content}</div>
        </article>
    )

}