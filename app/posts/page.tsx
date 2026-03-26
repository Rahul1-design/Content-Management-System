"use client"

import { Search } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PostPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        filterPosts()
    }, [searchTerm, selectedCategory, posts])

    const fetchPosts = async () => {
        try {
            const res = await fetch('api/posts');
            const data = await res.json();

            if (data.success) {
                setPosts(data.posts)
            }

            // extracting the categories
            const cats = Array.from(new Set(
                data.posts.map((item: any) => item.category).filter((c: string) => c)
            )) as string[]

            setCategories(cats)

        } catch (error) {
            console.error("Failed to fetch posts")
        } finally {
            setLoading(false)
        }
    }

    const filterPosts = () => {

    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">All Posts</h1>

            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transfrom -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-transparent " />
                    </div>

                    {/* Category filter */}
                    <select title="category" name={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                    Showing {filteredPosts.length} of {posts.length} posts
                </p>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No posts found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <>
                            <Link key={post._id} href={`posts/${post.slug}`} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition" >
                                {
                                    post.coverImage && (
                                        <Image src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
                                    )
                                }

                                <div className="p-6">
                                    {post.category && (
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                                            {post.category}
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>

                                {post.excerpt && (
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-4">{post.excerpt}</p>
                                )}

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{post.author?.name}</span>
                                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                                </div>
                            </Link>
                        </>
                    ))}
                </div>
            )}
        </div>
    )
}