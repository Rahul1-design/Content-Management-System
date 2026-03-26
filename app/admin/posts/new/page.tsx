"use client"

import ImageUploader from "@/components/ImageUploader"
import RichTextEditor from "@/components/RichTextEditor"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type statusType = "draft" | "published"

export default function NewPost() {
    const router = useRouter();
    const { data: session, status } = useSession()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        coverImage: '',
        category: '',
        tags: '',
        status: 'draft' as statusType
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log({ [e.target.name]: e.target.value })
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

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
                })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to create post");
            }

            router.push('/admin/dashboard')
            router.refresh()
        } catch (error) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (status === 'loading') return <div className=";text-4xl font-bold">Loading....</div>
    if (!session) return <div className="text-4xl text-red-600 font-bold">Unauthorized</div>

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

            {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" title="title" required disabled={loading} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Cover Image</label>
                    <ImageUploader currentImage={formData.coverImage} onUpload={(url) => setFormData({ ...formData, coverImage: url })} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <input name="excerpt" type="text" title="excerpt" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.excerpt} placeholder="Brief decription (optional)" onChange={handleChange} disabled={loading} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <RichTextEditor content={formData.content} onChange={(content) => setFormData((prev) => ({ ...prev, content }))} />
                </div>

                <div className="grid grid-cols gap-6">

                    <div>
                        <label className="block mb-2">Category</label>
                        <input type="text" name="category" title="Category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled={loading} placeholder="Technology, Lifestyle, etc." />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <input name="tags" type="text" title="Tags" value={formData.tags} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled={loading} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select value={formData.status} onChange={handleChange} name="status" title="Status" id="select" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled={loading}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition">
                        {loading ? "Creating....." : "Create Post"}
                    </button>
                    <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition" >Cancel</button>
                </div>
            </form>
        </div>
    )
}