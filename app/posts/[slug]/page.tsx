import Image from "next/image";

async function getPost(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?slug=${slug}`, { cache: 'no-store' })
        const data = await res.json();
        return data.posts?.[0] || null
    } catch (error) {
        return null
    }
}
// type Post = {
//     title: string
//     content: string
//     createdAt: string
//     author?: { name: string }
//     category?: string
//     tags?: string[]
// }

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)
    const formattedDate = new Date(post.createdAt)
        .toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

    if (!post) return <div className="text-red-700 font-semibold text-4xl ">Post not found</div>

    return (
        <article className="max-w-4xl mx-auto p-8">

            {/* Cover Image */}
            {post.coverImage && (
                <div className="mb-8 -mx-8">
                    <Image src={post.coverImage} alt="post.title" className="w-full h-96 object-cover" />
                </div>
            )}

            {/* Header */}
            <header>
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                    By {post.author?.name} •
                    <time>{formattedDate}</time>
                </div>

                {post.category && (
                    <div className="flex gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {post.category}
                        </span>
                    </div>
                )}

                {post.category && (
                    <div className="flex gap-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {post.category}
                        </span>
                    </div>
                )}

                {post.tags && (
                    <>
                        {
                            post.tags?.map((tag: string) => (
                                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm ">#{tag}</span>
                            ))
                        }
                    </>
                )}

            </header>

            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }} />

        </article>
    )

}