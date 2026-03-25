"use client"
import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

export interface ImageUploaderProps {
    onUpload: (url: string) => void,
    currentImage?: string
}

export default function ImageUploader({ onUpload, currentImage }) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(currentImage || null)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return

        // show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        // Upload to server
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()

            if (data.success) {
                onUpload(data.url)
            } else {
                alert("Upload failed")
                setPreview(null)
            }
        } catch (error) {
            alert('Upload failed')
            setPreview(null)
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = () => {
        setPreview(null)
        onUpload('')
    }

    return (
        <div>
            {preview ? (
                <div className="relative">
                    <Image src={preview} alt="Preview" className='w-full h-64 object-cover rounded-lg' />
                    <button title='X' type='button' onClick={handleRemove} className="absolute top-2 right-2 bg-red-200 text-white p-2 rounded-full hover:bg-red-700">
                        <X className='w-4 h-4' />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className='mb-2 text-sm text-gray-400' />
                        <p className="mb-2 text-sm text-gray-400">
                            <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                        </p>
                    </div>
                    <input type="file" className='hidden' accept='image/*' onChange={handleUpload} disabled={uploading} />
                </label>
            )}

            {uploading && (
                <p className="text-sm text-gray-500 mt-2">Uploading....</p>
            )}
        </div>
    )
}