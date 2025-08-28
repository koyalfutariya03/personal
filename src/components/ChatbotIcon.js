"use client"

const ChatbotIcon = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        aria-label="Open chat"
        className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="16" height="16">
          <path
            fill="currentColor"
            d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-10 7.748-1.381 0-2.712-.254-3.959-.722l-3.071 1.05.665-2.923c-1.287-1.107-2.135-2.714-2.135-4.153 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.363-12 9.747 0 1.847.738 3.565 2.047 4.89l-1.304 5.723 6.118-2.09c1.283.481 2.643.742 4.039.742 6.627 0 12-4.363 12-9.749s-5.373-9.749-12-9.749z"
          />
        </svg>
      </button>
    );
  };
  
  export default ChatbotIcon;
  