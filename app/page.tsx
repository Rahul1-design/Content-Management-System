import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

async function getLatestPosts() {
  const res = await fetch('http://localhost:3000/api/posts?status=published', {
    cache: 'no-store'
  })
  const data = await res.json()
  return data.posts?.slice(0, 6) || []
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const posts = await getLatestPosts()
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our CMS</h1>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing content from talented writers
          </p>
          <Link
            href="/posts"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block transition"
          >
            Explore All Posts
          </Link>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-3xl font-bold mb-6">Featured Post</h2>
          <Link
            href={`/posts/${featuredPost.slug}`}
            className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="md:flex">
              {featuredPost.coverImage && (
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover"
                />
              )}
              <div className="p-8 md:w-1/2">
                {featuredPost.category && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    {featuredPost.category}
                  </span>
                )}
                <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                {featuredPost.excerpt && (
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                )}
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{featuredPost.author?.name}</span>
                  <span>•</span>
                  <time>{new Date(featuredPost.createdAt).toLocaleDateString()}</time>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Latest Posts Grid */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Link href="/posts" className="text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post: any) => (
            <Link
              key={post._id}
              href={`/posts/${post.slug}`}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                {post.category && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                    {post.category}
                  </span>
                )}

                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author?.name}</span>
                  <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!session &&
        <section className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Writing Today</h2>
            <p className="text-gray-600 mb-8">
              Join our community of writers and share your stories with the world
            </p>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block transition"
            >
              Create Account
            </Link>
          </div>
        </section>
      }
    </div>
  )
}