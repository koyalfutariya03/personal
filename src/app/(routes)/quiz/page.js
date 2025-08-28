// src/app/(routes)/quiz/page.js
import React from "react";
import { quizTopics } from "@/data/quizzes/page";
import QuizTopicCard from "@/components/quiz/QuizTopicCard";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Interactive Quizzes | Test Your Knowledge - Connecting Dots ERP",
  description:
    "Challenge yourself with our comprehensive interactive quizzes covering SAP, Software Development, Digital Marketing, and HR topics. Test your skills and track your progress.",

  // Open Graph Tags
  openGraph: {
    title: "Interactive Quizzes | Test Your Knowledge - Connecting Dots ERP",
    description:
      "Challenge yourself with our comprehensive interactive quizzes covering SAP, Software Development, Digital Marketing, and HR topics. Test your skills and track your progress.",
    url: "https://connectingdotserp.com/quiz",
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: "https://connectingdotserp.com/images/quiz-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Interactive Quizzes - Connecting Dots ERP",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card Tags
  twitter: {
    card: "summary_large_image",
    title: "Interactive Quizzes | Test Your Knowledge - Connecting Dots ERP",
    description:
      "Challenge yourself with our comprehensive interactive quizzes covering SAP, Software Development, Digital Marketing, and HR topics.",
    images: ["https://connectingdotserp.com/images/quiz-banner.jpg"],
    site: "@CD_ERP",
    creator: "@CD_ERP",
  },

  // Additional Meta Tags
  keywords:
    "online quiz, SAP quiz, programming quiz, digital marketing quiz, HR quiz, skill assessment, interactive learning, Connecting Dots ERP",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://connectingdotserp.com/quiz",
  },
};

export default function QuizTopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] rounded-full">
              <AcademicCapIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] bg-clip-text text-transparent">
              {" "}
              Quiz Topic
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge and improve your skills with our interactive
            quizzes
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-[#2FA9EC] mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {quizTopics.length}
                </p>
                <p className="text-gray-600">Quiz Topics</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-[#1B4168] mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {quizTopics.reduce(
                    (total, topic) => total + topic.questionCount,
                    0
                  )}
                </p>
                <p className="text-gray-600">Total Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-[#1B4168] to-[#2FA9EC] rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">∞</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Unlimited</p>
                <p className="text-gray-600">Attempts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizTopics.map((topic) => (
            <QuizTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </div>
  );
}
