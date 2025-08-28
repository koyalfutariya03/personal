// components/quiz/QuizResult.js
import React from "react";
import confetti from "canvas-confetti";
import {
  TrophyIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const QuizResult = ({
  score,
  totalQuestions,
  totalPossibleScore,
  onRetry,
  onBack,
  quizTitle,
}) => {
  const percentage = Math.round((score / totalPossibleScore) * 100);

  React.useEffect(() => {
    if (percentage >= 80) {
      // Trigger confetti for excellent scores
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [percentage]);

  const getResultData = () => {
    if (percentage >= 80) {
      return {
        message: "Excellent! You have a great understanding of the topic.",
        bgColor: "from-green-500 to-green-600",
        textColor: "text-green-600",
        bgLight: "bg-green-50",
        icon: <TrophyIcon className="h-16 w-16 text-yellow-500" />,
      };
    } else if (percentage >= 60) {
      return {
        message:
          "Good job! You have a solid understanding, but there's room for improvement.",
        bgColor: "from-blue-500 to-blue-600",
        textColor: "text-blue-600",
        bgLight: "bg-blue-50",
        icon: <CheckCircleIcon className="h-16 w-16 text-blue-500" />,
      };
    } else if (percentage >= 40) {
      return {
        message: "Not bad, but you might want to study more on this topic.",
        bgColor: "from-yellow-500 to-yellow-600",
        textColor: "text-yellow-600",
        bgLight: "bg-yellow-50",
        icon: <ChartBarIcon className="h-16 w-16 text-yellow-500" />,
      };
    } else {
      return {
        message: "You need to improve your knowledge on this topic.",
        bgColor: "from-red-500 to-red-600",
        textColor: "text-red-600",
        bgLight: "bg-red-50",
        icon: <XCircleIcon className="h-16 w-16 text-red-500" />,
      };
    }
  };

  const resultData = getResultData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${resultData.bgColor} p-8 text-center text-white`}
        >
          <div className="mb-4 flex justify-center">{resultData.icon}</div>
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-lg opacity-90">{quizTitle}</p>
        </div>

        {/* Score Display */}
        <div className="p-8">
          <div
            className={`${resultData.bgLight} rounded-xl p-8 text-center mb-8`}
          >
            <div className="mb-4">
              <div
                className={`text-6xl font-bold ${resultData.textColor} mb-2`}
              >
                {percentage}%
              </div>
              <div className="text-2xl font-semibold text-gray-700">
                {score} / {totalPossibleScore} points
              </div>
            </div>

            {/* Progress Ring */}
            <div className="flex justify-center mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                  className={resultData.textColor}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Result Message */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {resultData.message}
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {totalQuestions}
              </div>
              <div className="text-gray-600">Questions</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.floor((score / totalPossibleScore) * totalQuestions)}
              </div>
              <div className="text-gray-600">Correct</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRetry}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Retry Quiz
            </button>
            <button
              onClick={onBack}
              className="flex-1 flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
