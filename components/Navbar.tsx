"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex gap-6">
                        <Link href='/' className="hover:text-gray-300">Home</Link>
                        <Link href="/posts" className="hover:text-gray-300">Posts</Link>
                        {session && (
                            <Link href="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {status === 'loading' ? (
                            <span className="text-sm">Laoding....</span>
                        ) : session ? (
                            <>
                                <span className="text-sm">{session.user.name} ({session.user.role}) </span>
                                <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm">Sign Out</button>
                            </>
                        ) : (
                            <Link href="/auth/signin" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm ">Sign In</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}