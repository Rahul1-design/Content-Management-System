import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type Post = {
    _id: string,
    title: string,
    status: 'draft' | 'published',
    createdAt: string
}

async function getUserPosts(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?author=${userId}`, {
        cache: 'no-store'
    })

    const data = await res.json();
    return data.posts || []
}


export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin")
    }

    const posts: Post[] = await getUserPosts(session.user.id);
    const publishedCount = posts.filter((p: Post) => p.status == 'published').length
    const draftCount = posts.filter((p: Post) => p.status === "draft").length

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {session.user.name}! </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
                    <p className="text-3xl font-bold mt-2">{posts.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Published</h3>
                    <p className="text-3xl font-bold mt--2 text-green-600">{publishedCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Draft</h3>
                    <p className="text-3xl font-bold mt--2 text-green-600">{draftCount}</p>
                </div>

                {/* Actions */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="flex gap-4">
                        <Link href="/admin/posts/new" className="bg-blue-600 text-white px-6 py-3 rouned-lg hover:bg-blue-700">Create New Post</Link>
                        {session.user.role === 'admin' && (
                            <link href="/admin/users" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">Manage Users</link>
                        )}
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Your Recent Posts</h2>
                    <div className="space-y-4">
                        {posts.length === 0 ? (
                            <p className="text-gray-500">No posts yet. Create your first posts!</p>
                        ) : (
                            posts.slice(0, 5).map((posts: Post) => (
                                <div className="border-b pb-4 last:border-0" key={posts._id}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <Link href={`/admin/posts/edit/${posts._id}`} className="text-lg font-sembold hover:text-blue-600">{posts.title}</Link>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(posts.createdAt).toLocaleDateString()} •{' '}
                                                <span className={posts.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>{posts.status}</span>
                                            </p>
                                        </div>
                                        <Link href={`/admin/posts/edit/${posts._id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}