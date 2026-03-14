"use client"

import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import {
    Bold, Italic, Strikethrough, Code, List, ListOrdered,
    Quote, Undo, Redo, Link2, ImageIcon, Heading1, Heading2
} from 'lucide-react'

interface RichTextEditorProps {
    content: string,
    onChange: (content: string) => void
}

const MenuButton = ({ onClick, active, children }: {
    onClick: () => void
    active?: boolean
    children: React.ReactNode
}) => (
    <button type="button" title="Menu" onClick={onClick} className={`p-2 rounded hover:bg-gray-200 ${active ? 'bg-gray-300' : ''} `}> {children} </button>
)

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                }
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Placeholder.configure({
                placeholder: 'Start writing your amazing content....'
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
            },
        },
    })

    if (!editor) return null

    const addLink = () => {
        const url = window.prompt("Enter URL:");
        if (url) {
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    const addImage = () => {
        const url = window.prompt("Enter Image URL:-");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }



    return (
        <div className=" border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className=" bg-gray-100 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} >
                    <Bold className="w-4 h-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} >
                    <Italic className="w-4 h-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} >
                    <Strikethrough className="w-4 h-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} >
                    <Code className="w-4 h-4" />
                </MenuButton>

                <div className="w-px bg-gray-300 mx-1" />

                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} >
                    <Heading1 className="w-4 h-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} >
                    <Heading2 className="w-4 h-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletlist")} >
                    <List className="2-4 h-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} >
                    <Quote className="2-4 h-4" />
                </MenuButton>

                <div className="w-px bg-gray-300 mx-1" />

                <MenuButton onClick={addLink}>
                    <Link2 className="w-4 h-4" />
                </MenuButton>

                <MenuButton onClick={addImage} >
                    <ImageIcon className="w-4 h-4" />
                </MenuButton>

                <div className="w-px bg-gray-300 mx-1" />

                <MenuButton onClick={() => editor.chain().focus().undo().run()}>
                    <Undo className="w-4 h-4" />
                </MenuButton>

                <MenuButton onClick={() => editor.chain().focus().redo().run()}>
                    <Redo className="w-4 h-4" />
                </MenuButton>

            </div>

            {/* Editor */}
            <div className="p-4">
                <EditorContent editor={editor} />
            </div>

        </div>
    )
}