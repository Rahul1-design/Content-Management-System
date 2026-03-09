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

}