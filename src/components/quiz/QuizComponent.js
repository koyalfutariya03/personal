// components/quiz/QuizComponent.js
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import QuizResult from "@/components/quiz/QuizResult";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const QuizComponent = ({ quiz }) => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Auto-save answers to localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`quiz-${quiz.title}-answers`);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  }, [quiz.title]);

  useEffect(() => {
    localStorage.setItem(
      `quiz-${quiz.title}-answers`,
      JSON.stringify(selectedAnswers)
    );
  }, [selectedAnswers, quiz.title]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleQuizSubmit();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswerSelect = useCallback(
    (questionIndex, choice) => {
      const question = quiz.questions[questionIndex];

      if (question.type === "MCQs" || question.type === "boolean") {
        setSelectedAnswers((prev) => ({
          ...prev,
          [questionIndex]: [choice],
        }));
      } else if (question.type === "MAQs") {
        setSelectedAnswers((prev) => {
          const currentAnswers = prev[questionIndex] || [];
          const newAnswers = currentAnswers.includes(choice)
            ? currentAnswers.filter((answer) => answer !== choice)
            : [...currentAnswers, choice];

          return {
            ...prev,
            [questionIndex]: newAnswers,
          };
        });
      }
    },
    [quiz.questions]
  );

  const calculateScore = useCallback(() => {
    let totalScore = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswers = selectedAnswers[index] || [];
      const correctAnswers = question.correctAnswers;

      if (question.type === "MCQs" || question.type === "boolean") {
        if (
          userAnswers.length === 1 &&
          correctAnswers.includes(userAnswers[0])
        ) {
          totalScore += question.score;
        }
      } else if (question.type === "MAQs") {
        const allCorrect = correctAnswers.every((answer) =>
          userAnswers.includes(answer)
        );
        const noIncorrect = userAnswers.every((answer) =>
          correctAnswers.includes(answer)
        );

        if (allCorrect && noIncorrect && userAnswers.length > 0) {
          totalScore += question.score;
        }
      }
    });

    return totalScore;
  }, [quiz.questions, selectedAnswers]);

  const handleQuizSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResult(true);

    // Clear saved answers
    localStorage.removeItem(`quiz-${quiz.title}-answers`);
    setIsSubmitting(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(selectedAnswers).filter(
      (key) => selectedAnswers[key] && selectedAnswers[key].length > 0
    ).length;
  };

  if (showResult) {
    return (
      <QuizResult
        score={score}
        totalQuestions={quiz.questions.length}
        totalPossibleScore={quiz.questions.reduce((sum, q) => sum + q.score, 0)}
        onRetry={() => router.refresh()}
        onBack={() => router.push("/quiz")}
        quizTitle={quiz.title}
      />
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  const userAnswers = selectedAnswers[currentQuestion] || [];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const answeredCount = getAnsweredQuestionsCount();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">{quiz.title}</h2>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center px-3 py-1 rounded-full ${
                timeLeft < 60
                  ? "bg-red-500 bg-opacity-20"
                  : "bg-white bg-opacity-20"
              }`}
            >
              <ClockIcon className="h-5 w-5 mr-2 text-black" />
              <span
                className={`font-mono text-black ${timeLeft < 60 ? "text-red-200" : ""}`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <ProgressBar
          current={currentQuestion + 1}
          total={quiz.questions.length}
          className="mb-2"
        />

        <div className="flex justify-between text-sm text-blue-100">
          <span>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span>{answeredCount} answered</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-start mb-4">
            <QuestionMarkCircleIcon className="h-6 w-6 text-[#2FA9EC] mr-3 mt-1 flex-shrink-0" />
            <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
              {currentQuestionData.question}
            </h3>
          </div>

          {currentQuestionData.type === "MAQs" && (
            <div className="bg-blue-50 border-l-4 border-[#2FA9EC] p-4 mb-6">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-[#2FA9EC] mr-2" />
                <p className="text-sm text-blue-800">
                  This is a multiple answer question. Select all correct
                  options.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Answer Choices */}
        <div className="space-y-3 mb-8">
          {currentQuestionData.choices.map((choice, index) => {
            const isSelected = userAnswers.includes(choice);
            const inputType =
              currentQuestionData.type === "MAQs" ? "checkbox" : "radio";

            return (
              <label
                key={index}
                className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-[#2FA9EC] bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-[#2FA9EC] hover:bg-gray-50"
                }`}
              >
                <input
                  type={inputType}
                  name={
                    inputType === "radio" ? `question-${currentQuestion}` : ""
                  }
                  checked={isSelected}
                  onChange={() => handleAnswerSelect(currentQuestion, choice)}
                  className="mt-1 mr-4 h-4 w-4 text-[#2FA9EC] focus:ring-[#2FA9EC] focus:ring-offset-0"
                />
                <span className="text-gray-900 leading-relaxed">{choice}</span>
                {isSelected && (
                  <CheckCircleIcon className="h-5 w-5 text-[#2FA9EC] ml-auto" />
                )}
              </label>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            ← Previous
          </button>

          <div className="flex space-x-3">
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Finish Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Submit Quiz?
            </h3>
            <p className="text-gray-600 mb-6">
              You have answered {answeredCount} out of {quiz.questions.length}{" "}
              questions. Are you sure you want to submit?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleQuizSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
