import Button from "@components/UI/Button"

interface SurveyFooterProps {
    onSubmit: () => void
    onRandomize: () => void
}

export const SurveyFooter: React.FC<SurveyFooterProps> = ({ onSubmit }) => {
    return (
        <div className="text-center pt-6 space-y-4">
            <Button label=" Nộp bài"
                onClick={onSubmit}
            />
            {/* <button
                className="bg-gray-600 text-white px-6 py-3 rounded-full shadow hover:bg-gray-700 transition-all duration-200"
                onClick={onRandomize}
            >
                Random hóa câu trả lời
            </button> */}
        </div>
    )
}
