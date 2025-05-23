import BackButton from '@components/UI/BackButton'
import Button from '@components/UI/Button'
import { useRouter } from 'next/router'

export default function SurveyIndexPage() {
    const router = useRouter()

    const handleStartSurvey = () => {
        router.push('/survey/take-test')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-xl space-y-6">
                <BackButton />
                <h1 className="text-2xl font-bold text-center">Khảo sát nghề nghiệp</h1>
                <p className="text-gray-600 text-center">
                    Hãy bắt đầu bài khảo sát để tìm hiểu nhóm tính cách nghề nghiệp của bạn theo mô hình Holland (RIASEC).
                </p>
                <div className="flex justify-center">
                    <Button label="Bắt đầu khảo sát"
                        onClick={handleStartSurvey}
                    />
                </div>
            </div>
        </div>
    )
}
