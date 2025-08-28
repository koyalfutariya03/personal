// data/quizzes/javascript.js
export const javascriptQuiz = {
  title: "JavaScript Fundamentals",
  description:
    "Test your knowledge of JavaScript fundamentals and core concepts",
  timeLimit: 900, // 15 minutes
  category: "Programming",
  difficulty: "Intermediate",
  tags: ["javascript", "fundamentals", "programming"],
  questions: [
    {
      id: 1,
      question:
        "Which of the following are JavaScript data types? (Select all that apply)",
      choices: ["String", "Number", "Boolean", "Function", "Array", "Object"],
      type: "MAQs",
      correctAnswers: [
        "String",
        "Number",
        "Boolean",
        "Function",
        "Array",
        "Object",
      ],
      explanation:
        "JavaScript has several primitive data types (String, Number, Boolean) and complex types (Function, Array, Object).",
      score: 15,
      difficulty: "medium",
    },
    {
      id: 2,
      question: 'What is the result of "5" + 3 in JavaScript?',
      choices: ["8", '"53"', "53", "Error"],
      type: "MCQs",
      correctAnswers: ['"53"'],
      explanation:
        'JavaScript performs string concatenation when one operand is a string, so "5" + 3 becomes "53".',
      score: 10,
      difficulty: "easy",
    },
    {
      id: 3,
      question:
        'The "this" keyword in JavaScript always refers to the current function.',
      choices: ["True", "False"],
      type: "boolean",
      correctAnswers: ["False"],
      explanation:
        'The "this" keyword refers to the object that is executing the current function, not the function itself.',
      score: 10,
      difficulty: "medium",
    },
    {
      id: 4,
      question:
        "Which operator is used for strict equality comparison in JavaScript?",
      choices: ["==", "===", "=", "!="],
      type: "MCQs",
      correctAnswers: ["==="],
      explanation:
        "The === operator checks for strict equality without type coercion.",
      score: 10,
      difficulty: "easy",
    },
    {
      id: 5,
      question:
        "Which of the following methods can be used to iterate over an array? (Select all that apply)",
      choices: [
        "forEach()",
        "map()",
        "for...of",
        "for...in",
        "reduce()",
        "filter()",
      ],
      type: "MAQs",
      correctAnswers: [
        "forEach()",
        "map()",
        "for...of",
        "reduce()",
        "filter()",
      ],
      explanation:
        "All except for...in are appropriate for array iteration. for...in iterates over enumerable properties.",
      score: 15,
      difficulty: "medium",
    },
    {
      id: 6,
      question: 'What is the purpose of the "use strict" directive?',
      choices: [
        "To enable strict mode which catches common coding errors",
        "To make JavaScript faster",
        "To enable ES6 features",
        "To disable console.log statements",
      ],
      type: "MCQs",
      correctAnswers: [
        "To enable strict mode which catches common coding errors",
      ],
      explanation:
        "Strict mode helps catch common coding mistakes and prevents the use of certain error-prone features.",
      score: 10,
      difficulty: "medium",
    },
    {
      id: 7,
      question:
        "Hoisting in JavaScript means variables are moved to the top of their scope.",
      choices: ["True", "False"],
      type: "boolean",
      correctAnswers: ["True"],
      explanation:
        "Hoisting moves variable and function declarations to the top of their containing scope during compilation.",
      score: 10,
      difficulty: "hard",
    },
    {
      id: 8,
      question:
        "Which of the following are falsy values in JavaScript? (Select all that apply)",
      choices: ["0", '""', "null", "undefined", "false", "NaN", "[]", "{}"],
      type: "MAQs",
      correctAnswers: ["0", '""', "null", "undefined", "false", "NaN"],
      explanation:
        'Falsy values are: false, 0, "", null, undefined, and NaN. Empty arrays and objects are truthy.',
      score: 15,
      difficulty: "medium",
    },
  ],
};
