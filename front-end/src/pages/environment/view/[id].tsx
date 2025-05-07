import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRef } from 'react'



export default function EnvironmentModelPage() {
    const router = useRouter()
    const { id } = router.query
    const [modelUrl, setModelUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const scriptLoaded = useRef(false)

    useEffect(() => {
        // Load model-viewer script only once
        if (!scriptLoaded.current) {
            const script = document.createElement('script')
            script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
            script.type = 'module'
            script.onload = () => {
                scriptLoaded.current = true
            }
            document.head.appendChild(script)
        }
    }, [])

    useEffect(() => {
        if (!id) return

        const fetchModelSignedUrl = async () => {
            try {
                const res = await fetch(`/api/v1/model/${id}/view`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const data = await res.json()

                if (res.ok && data?.metadata?.name) {
                    setModelUrl(data.metadata.name)
                } else {
                    console.error('Lỗi lấy signed URL:', data?.message)
                }
            } catch (error) {
                console.error('Lỗi fetch:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchModelSignedUrl()
    }, [id])

    if (loading) return <p className="text-center mt-8">Đang tải mô hình 3D...</p>
    if (!modelUrl) return <p className="text-center mt-8">Không tìm thấy mô hình hoặc signed URL.</p>

    return (
        <div className="max-w-5xl mx-auto p-6  w-screen h-screen ">
            <h1 className="text-2xl font-semibold mb-6 text-center">Trình xem mô hình 3D</h1>
            {modelUrl === "office2" ? (
                <iframe
                    src="https://ar-advertisement.vercel.app/model/32d41ecd13"
                    frameBorder="0"
                    className="w-full h-full"
                />
            ) : modelUrl === "hospital" ? (
                <iframe
                    src="https://ar-advertisement.vercel.app/model/43535633b9"
                    frameBorder="0"
                    className="w-full h-full"
                />
            ) : modelUrl === "laboratory" ? (
                <iframe
                    src="https://ar-advertisement.vercel.app/model/d174592b9f"
                    frameBorder="0"
                    className="w-full h-full"
                />
            ) : (
                <div className="text-center text-gray-500 mt-4">Đang phát triển</div>
            )}

        </div>
    )
}
