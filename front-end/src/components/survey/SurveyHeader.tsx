interface SurveyHeaderProps {
    progress: number;
    totalQuestions: number;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({ progress, totalQuestions }) => {
    const percentage = totalQuestions > 0 ? Math.round((progress / totalQuestions) * 100) : 0;

    const scaleLabels = [
        { text: 'Rất không phù hợp', color: 'text-red-500' },
        { text: 'Không phù hợp', color: 'text-yellow-500' },
        { text: 'Trung lập', color: 'text-gray-500' },
        { text: 'Phù hợp', color: 'text-green-500' },
        { text: 'Rất phù hợp', color: 'text-green-600' },
    ];

    return (
        <div className="text-center space-y-4 sticky top-0 z-10 bg-white py-4 shadow-md">
            {/* Progress Bar */}
            <div className="w-full max-w-lg mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Đã làm: {progress}/{totalQuestions}</span>
                    <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-semibold px-4">
                Hãy chọn mức độ phản ánh đúng nhất về bạn cho mỗi câu sau
            </h1>

            {/* Scale Labels */}
            <div className="grid grid-cols-5 gap-1 px-4 text-xs font-medium">
                {scaleLabels.map((label, index) => (
                    <div key={index} className={`text-center ${label.color}`}>{label.text}</div>
                ))}
            </div>
        </div>
    );
};
