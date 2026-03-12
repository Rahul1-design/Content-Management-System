"use client"

import RichTextEditor from "@/components/RichTextEditor"
import { useState } from "react"

export default function EditorTestPage() {
    const [content, setContent] = useState('')

    return (
        <div className="max-w-4xl mx-auto p-8" >
            <h1 className="text-2xl font-bold mb-4">Editor Test</h1>
            <RichTextEditor content={content} onChange={(newContent) => setContent(newContent)} />

            <div className="mt-8">
                <h2 className="font-bold mb-2"> Saved HTML Output:</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm">{content}</pre>
            </div>
        </div>
    )
}