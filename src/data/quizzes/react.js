// data/quizzes/react.js
export const reactQuiz = {
  title: "React Development",
  description: "Test your knowledge of React library and its core concepts",
  timeLimit: 1200, // 20 minutes
  category: "Frontend Framework",
  difficulty: "Intermediate",
  tags: ["react", "frontend", "components"],
  questions: [
    {
      id: 1,
      question:
        "What are the correct ways to create a React component? (Select all that apply)",
      choices: [
        "class MyComponent extends React.Component",
        "function MyComponent() {}",
        "const MyComponent = () => {}",
        "React.createComponent()",
        "const MyComponent = React.forwardRef(() => {})",
      ],
      type: "MAQs",
      correctAnswers: [
        "class MyComponent extends React.Component",
        "function MyComponent() {}",
        "const MyComponent = () => {}",
        "const MyComponent = React.forwardRef(() => {})",
      ],
      explanation:
        "React components can be created using class components, function components, arrow functions, or forwardRef.",
      score: 15,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is the Virtual DOM in React?",
      choices: [
        "A copy of the real DOM kept in memory",
        "A JavaScript representation of the real DOM",
        "A faster version of the real DOM",
        "All of the above",
      ],
      type: "MCQs",
      correctAnswers: ["A JavaScript representation of the real DOM"],
      explanation:
        "The Virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates.",
      score: 10,
      difficulty: "medium",
    },
    {
      id: 3,
      question: "React hooks can only be used in functional components.",
      choices: ["True", "False"],
      type: "boolean",
      correctAnswers: ["True"],
      explanation:
        "Hooks are a feature that allows you to use state and other React features in functional components only.",
      score: 10,
      difficulty: "easy",
    },
    {
      id: 4,
      question: "Which React hook is used for managing component state?",
      choices: ["useEffect", "useState", "useContext", "useReducer"],
      type: "MCQs",
      correctAnswers: ["useState"],
      explanation:
        "useState is the primary hook for managing local component state in functional components.",
      score: 10,
      difficulty: "easy",
    },
    {
      id: 5,
      question:
        "Which of the following are valid React lifecycle methods? (Select all that apply)",
      choices: [
        "componentDidMount",
        "componentWillUnmount",
        "componentDidUpdate",
        "componentWillMount",
        "componentDidCatch",
      ],
      type: "MAQs",
      correctAnswers: [
        "componentDidMount",
        "componentWillUnmount",
        "componentDidUpdate",
        "componentDidCatch",
      ],
      explanation:
        "componentWillMount is deprecated. The others are valid lifecycle methods.",
      score: 15,
      difficulty: "medium",
    },
    {
      id: 6,
      question: "What is the purpose of the key prop in React lists?",
      choices: [
        "To uniquely identify list items for efficient re-rendering",
        "To sort the list items",
        "To style the list items",
        "To pass data to list items",
      ],
      type: "MCQs",
      correctAnswers: [
        "To uniquely identify list items for efficient re-rendering",
      ],
      explanation:
        "Keys help React identify which items have changed, are added, or are removed for efficient updates.",
      score: 10,
      difficulty: "medium",
    },
  ],
};
