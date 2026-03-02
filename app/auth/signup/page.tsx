"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log({ [e.target.name]: e.target.value })
    }

    const showpass = (e: FormEvent) => {
        setshowPassword(item => !item)
    }

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('')

        if (formData.password !== formData.password) {
            setError("Password do not match")
            return
        }

        if (formData.password.length < 6) {
            setError("Password must be atleast 6 characters")
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: 'writer'
                })
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create account")
            }
            router.push("/auth/signin?registered=true")
        } catch (error: Error | unknown) {
            setError(error instanceof Error ? error.message : "Something went wrong")
        } finally {
            setLoading(true)
        }
    }

    return (
        <div className="flex max-h-screen justify-center items-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl mb-6 text-center font-bold ">Create Account</h1>
                {error && <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3
                rounded mb-4">{error}</div>}


                <form onSubmit={handleSumbit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input type="text" title="Name" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent " disabled={loading} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" title="Email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="flex w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">

                            <input type={showPassword ? "text" : 'password'} title="Password" name="password" onChange={handleChange} value={formData.password} required disabled={loading} className="flex-1 outline-0" />
                            <button className="cursor-pointer" onClick={showpass} type="button" title="button">
                                <Image src={showPassword ? "/openeye.png" : "/eye-password-hide.svg"} alt="Show Password" width={20} height={20} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <div className="flex w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <input type={showConfirmPassword ? "text" : "password"} className="outline-0 flex-1" title="ConfirmPassword" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required disabled={loading} />

                            <button onClick={() => setshowConfirmPassword(prev => !prev)} title="Button" type="button" className="cursor-pointer">
                                <Image alt="Eye Image" src={showConfirmPassword ? "/openeye.png" : "/eye-password-hide.svg"} width={20} height={20} />
                            </button>
                        </div>
                    </div>

                    <button type="submit" title="Submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-80 transition cursor-pointer" >{loading ? "Creating account" : "Sign Up"} </button>
                </form>

                <p className="mt-6 text-center text-sm text-grey-600">
                    Already have an account? {' '}
                    <Link href='/auth/signin' className="text-blue-600 hover-underline">Sign In</Link>
                </p>
            </div>
        </div>
    )
}