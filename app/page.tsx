async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: 'no-store'
  })
  const data = await res.json();
  return data.posts || []
}


export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <article key={post._id} className="border p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <div className="text-sm text-gray-500">
              By {post.author?.name} • {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}