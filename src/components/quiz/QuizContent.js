// src/components/quiz/QuizContent.js
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getQuizByTopic } from "@/data/quizzes/page";
import QuizComponent from "./QuizComponent";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function QuizContent({ params }) {
  const router = useRouter();
  const { topic } = params;
  const quiz = topic ? getQuizByTopic(topic) : null;

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {topic ? "Quiz Not Found" : "Loading..."}
            </h2>
            <p className="text-gray-600">
              {topic
                ? "The quiz you're looking for doesn't exist."
                : "Please wait while we load your quiz..."}
            </p>
          </div>
          <button
            onClick={() => router.push("/quiz")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push("/quiz")}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-[#1B4168] font-medium transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Topics
          </button>
        </div>
        <QuizComponent quiz={quiz} />
      </div>
    </div>
  );
}
