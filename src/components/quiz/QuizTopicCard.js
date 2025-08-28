// components/quiz/QuizTopicCard.js
import React from "react";
import Link from "next/link";
import {
  ClockIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const getDifficultyColor = (difficulty) => {
  if (difficulty.toLowerCase().includes("beginner"))
    return "bg-green-100 text-green-800";
  if (difficulty.toLowerCase().includes("intermediate"))
    return "bg-yellow-100 text-yellow-800";
  if (difficulty.toLowerCase().includes("advanced"))
    return "bg-red-100 text-red-800";
  return "bg-blue-100 text-blue-800";
};

const QuizTopicCard = ({ topic }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] p-6">
        <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
        <p className="text-blue-100 text-sm">{topic.description}</p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
            <span className="text-sm">{topic.questionCount} Questions</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span className="text-sm">10 min</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}
          >
            <ChartBarIcon className="h-3 w-3 mr-1" />
            {topic.difficulty}
          </span>
        </div>

        {/* CTA Button */}
        <Link href={`/quiz/${topic.id}`} className="block">
          <button className="w-full bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:scale-105">
            Start Quiz
            <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizTopicCard;
