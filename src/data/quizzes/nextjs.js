// data/quizzes/nextjs.js
export const nextjsQuiz = {
  title: "Next.js Framework",
  description: "Test your knowledge of Next.js framework and its features",
  timeLimit: 1200, // 20 minutes
  category: "Full-Stack Framework",
  difficulty: "Advanced",
  tags: ["nextjs", "react", "ssr", "fullstack"],
  questions: [
    {
      id: 1,
      question:
        "Which of the following are Next.js data fetching methods? (Select all that apply)",
      choices: [
        "getStaticProps",
        "getServerSideProps",
        "getInitialProps",
        "getStaticPaths",
        "getClientProps",
      ],
      type: "MAQs",
      correctAnswers: [
        "getStaticProps",
        "getServerSideProps",
        "getInitialProps",
        "getStaticPaths",
      ],
      explanation:
        "Next.js provides several data fetching methods, but getClientProps is not a valid method.",
      score: 15,
      difficulty: "medium",
    },
    {
      id: 2,
      question: "What is the purpose of getStaticProps in Next.js?",
      choices: [
        "To fetch data at build time for static generation",
        "To fetch data on every request",
        "To fetch data on the client side",
        "To generate dynamic routes",
      ],
      type: "MCQs",
      correctAnswers: ["To fetch data at build time for static generation"],
      explanation:
        "getStaticProps runs at build time and is used for Static Site Generation (SSG).",
      score: 10,
      difficulty: "medium",
    },
    {
      id: 3,
      question:
        "Next.js supports both Static Site Generation (SSG) and Server-Side Rendering (SSR).",
      choices: ["True", "False"],
      type: "boolean",
      correctAnswers: ["True"],
      explanation:
        "Next.js is a hybrid framework that supports both SSG and SSR depending on the page configuration.",
      score: 10,
      difficulty: "easy",
    },
    {
      id: 4,
      question: "Which folder in Next.js is used for API routes?",
      choices: ["api/", "pages/api/", "routes/", "server/"],
      type: "MCQs",
      correctAnswers: ["pages/api/"],
      explanation:
        "API routes in Next.js are placed in the pages/api/ directory (or app/api/ in App Router).",
      score: 10,
      difficulty: "easy",
    },
    {
      id: 5,
      question:
        "Which of the following are benefits of using Next.js? (Select all that apply)",
      choices: [
        "Automatic code splitting",
        "Built-in CSS support",
        "Image optimization",
        "Automatic routing",
        "Built-in authentication",
      ],
      type: "MAQs",
      correctAnswers: [
        "Automatic code splitting",
        "Built-in CSS support",
        "Image optimization",
        "Automatic routing",
      ],
      explanation:
        "Next.js provides many built-in features, but authentication needs to be implemented separately.",
      score: 15,
      difficulty: "medium",
    },
  ],
};
