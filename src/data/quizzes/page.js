// data/quizzes/page.js
import { javascriptQuiz } from "./javascript";
import { reactQuiz } from "./react";
import { nextjsQuiz } from "./nextjs";

export const quizTopics = [
  {
    id: "javascript",
    title: javascriptQuiz.title,
    description: javascriptQuiz.description,
    questionCount: javascriptQuiz.questions.length,
    difficulty: javascriptQuiz.difficulty,
    category: javascriptQuiz.category,
    tags: javascriptQuiz.tags,
    estimatedTime: Math.ceil(javascriptQuiz.timeLimit / 60), // in minutes
    totalScore: javascriptQuiz.questions.reduce((sum, q) => sum + q.score, 0),
  },
  {
    id: "react",
    title: reactQuiz.title,
    description: reactQuiz.description,
    questionCount: reactQuiz.questions.length,
    difficulty: reactQuiz.difficulty,
    category: reactQuiz.category,
    tags: reactQuiz.tags,
    estimatedTime: Math.ceil(reactQuiz.timeLimit / 60),
    totalScore: reactQuiz.questions.reduce((sum, q) => sum + q.score, 0),
  },
  {
    id: "nextjs",
    title: nextjsQuiz.title,
    description: nextjsQuiz.description,
    questionCount: nextjsQuiz.questions.length,
    difficulty: nextjsQuiz.difficulty,
    category: nextjsQuiz.category,
    tags: nextjsQuiz.tags,
    estimatedTime: Math.ceil(nextjsQuiz.timeLimit / 60),
    totalScore: nextjsQuiz.questions.reduce((sum, q) => sum + q.score, 0),
  },
];

export const getQuizByTopic = (topicId) => {
  const quizMap = {
    javascript: javascriptQuiz,
    react: reactQuiz,
    nextjs: nextjsQuiz,
  };

  return quizMap[topicId] || null;
};

// Utility functions
export const getQuizzesByCategory = (category) => {
  return quizTopics.filter((quiz) => quiz.category === category);
};

export const getQuizzesByDifficulty = (difficulty) => {
  return quizTopics.filter((quiz) => quiz.difficulty === difficulty);
};

export const searchQuizzes = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return quizTopics.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(term) ||
      quiz.description.toLowerCase().includes(term) ||
      quiz.tags.some((tag) => tag.toLowerCase().includes(term))
  );
};
