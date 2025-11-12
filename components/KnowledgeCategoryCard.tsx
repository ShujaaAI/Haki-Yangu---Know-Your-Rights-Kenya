
import React from 'react';
import { KnowledgeCategory } from '../types';

interface KnowledgeCategoryCardProps {
  category: KnowledgeCategory;
  onClick: (category: KnowledgeCategory) => void;
}

const KnowledgeCategoryCard: React.FC<KnowledgeCategoryCardProps> = ({ category, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-left w-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
          <i className={`${category.icon} text-blue-600 dark:text-blue-400`}></i>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{category.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{category.description}</p>
        </div>
      </div>
    </button>
  );
};

export default KnowledgeCategoryCard;
