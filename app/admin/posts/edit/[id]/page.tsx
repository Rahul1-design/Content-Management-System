/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditPost({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        status: 'draft'
    })

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/posts/${params.id}`)
            const data = await res.json();

            if (data.sucess) {
                const post = data.post;
                setFormData({
                    title: post.title,
                    content: post.content,
                    excerpt: post.excerpt || '',
                    category: post.category || '',
                    tags: post.tags?.join(', ') || '',
                    status: post.status
                })
            }
        } catch (error) {
            setError("Failed to load post")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true)
        setError('')

        try {
            const res = await fetch(`/api/posts/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'applicaton/json' },
                body: JSON.stringify({ ...formData, tags: formData.tags.split(',').map(e => e.trim()).filter(Boolean) })
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update post")
            }

            router.push('/admin/dashboard')
            router.refresh();

        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return

        setDeleting(true)

        try {
            const res = await fetch(`/api/posts/${params.id}`, {
                method: 'DELETE'
            })

            if (!res.ok) {
                throw new Error('Failed to delete post')
            }

            router.push('/admin/dashboard')
            router.refresh()

        } catch (error: any) {
            setError(error.message)
            setDeleting(false)
        }
    }
    if (loading) {
        return <div className="p-8 text-3xl text-red-500 font-bold text-center">Loading....</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Edit Post</h1>
                <button onClick={handleDelete} title="Delete" type="button" disabled={deleting} className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">{deleting ? 'Deleting....' : 'Delete Post'} </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red -400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow" >
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input title="Title" type="text" value={formData.title} onChange={handleChange} name='title' required disabled={saving} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <input type="text" title="Excerpt" name='excerpt' value={formData.excerpt} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500" required disabled={saving} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <textarea title="Content" name="content" value={formData.content} onChange={handleChange} required disabled={saving} className="w-full border border-gray-300 p-3 rounded-lg h-96 focus:ring-2 focus:ring-blue-500 font-mono text-sm" ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <input title='Category' type="text" value={formData.category} onChange={handleChange} disabled={saving} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Tags</label>
                        <input type="text" title="Tags" name="tags" value={formData.tags} onChange={handleChange} disabled={saving} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="tag1, tag2, tag3 etc" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select title="Status" name="status" value={formData.status} disabled={saving} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <button title="Save" type="submit" onSubmit={handleSubmit} disabled={saving} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">{saving ? "Saving...." : "Save Changes"} </button>
                    <button title="Cancel" type="button" className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300" onClick={() => router.back()} >Cancel</button>
                </div>
            </form>
        </div>
    )
}
