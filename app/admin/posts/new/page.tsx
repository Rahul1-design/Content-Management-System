"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

type statusType = "draft" | "published"

export default function NewPost() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        status: 'draft' as statusType
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.value]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            setError("Title and Content is required!")
            return
        }

        try {
            setLoading(true)
            setError("")

            const res = await fetch("api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    author: 'TEMP_USER_ID',
                })
            })

            if (!res.ok) {
                throw new Error("Failed to create post");
            }

            router.push('/admin')
            router.refresh()
        } catch (error) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" title="title" required />
                </div>

                <div>
                    <label className="block mb-2">Content</label>
                    <textarea title="content" value={formData.content} onChange={handleChange} className="w-full border p-2 rounded h-64" required />
                </div>

                <div>
                    <label className="block mb-2">Category</label>
                    <input type="text" title="Category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block mb-2">Status</label>
                    <select value={formData.status} onChange={handleChange} name="status" title="Status" id="select" className="w-full border p-2 rounded">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50">
                    {loading ? "Creating....." : "Creat Post"}
                </button>
            </form>
        </div>
    )
}