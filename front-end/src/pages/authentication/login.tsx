import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@components/UI/Button'

export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            setLoading(false)

            if (res.ok) {
                const justLoggedOut = localStorage.getItem('justLoggedOut');
                localStorage.removeItem('justLoggedOut');

                if (justLoggedOut === 'true') {
                    router.push('/dashboard');
                } else {
                    router.back();
                }
            } else {
                setError(data.message || 'Đăng nhập thất bại')
            }
        } catch (err) {
            console.error(err)
            setLoading(false)
            setError('Không thể kết nối đến máy chủ')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-4"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-4"
                    required
                />
                {/* <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button> */}
                <Button className='w-full p-2 mt-4' label={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}></Button>
                <Button variant='secondary' className='w-full p-2 mt-4' label="Tạo tài khoản mới"
                    onClick={() => router.push('./register')}
                ></Button>

            </form>
        </div>
    )
}
