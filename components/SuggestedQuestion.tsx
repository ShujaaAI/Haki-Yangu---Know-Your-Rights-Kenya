
import React from 'react';

interface SuggestedQuestionProps {
  question: string;
  onClick: (question: string) => void;
}

const SuggestedQuestion: React.FC<SuggestedQuestionProps> = ({ question, onClick }) => {
  return (
    <button
      onClick={() => onClick(question)}
      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm py-2 px-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {question}
    </button>
  );
};

export default SuggestedQuestion;
