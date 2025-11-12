
import React from 'react';
import { KnowledgeCategory } from '../types';

interface CategoryInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: KnowledgeCategory | null;
}

const CategoryInfoModal: React.FC<CategoryInfoModalProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen || !category) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="category-modal-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl p-6 md:p-8 relative max-h-[80vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-3xl leading-none" 
          aria-label="Close"
        >
          &times;
        </button>
        <h2 id="category-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <i className={`${category.icon} text-blue-500 mr-4`}></i>
          {category.title}
        </h2>
        <div 
          className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: category.content }}
        ></div>
      </div>
    </div>
  );
};

export default CategoryInfoModal;
