import React from 'react';
import { ChatMessage, StructuredResponse } from '../types';
import ResponseRenderer from './ResponseRenderer';

interface ChatMessageProps {
  message: ChatMessage;
  language: 'english' | 'kiswahili';
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, language }) => {
  const isUser = message.sender === 'user';
  const isAI = message.sender === 'ai';
  const isLoading = isAI && message.isLoading;

  const wrapperClass = isUser ? 'justify-end' : 'justify-start';
  const bubbleClass = isUser 
    ? 'bg-blue-600 text-white rounded-br-none' 
    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none';
  const avatarIcon = isUser ? 'fa-user' : 'fa-robot';
  const avatarClass = isUser ? 'ml-3' : 'mr-3';

  return (
    <div className={`flex items-start mb-6 ${wrapperClass}`}>
      {!isUser && (
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center ${avatarClass}`}>
          <i className={`fas ${avatarIcon} text-gray-600 dark:text-gray-300`}></i>
        </div>
      )}
      <div className={`max-w-2xl ${isUser ? 'order-1' : 'order-2'}`}>
        <div className={`px-4 py-3 rounded-lg shadow-md ${bubbleClass}`}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce mr-1"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce mr-1 [animation-delay:0.1s]"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            </div>
          ) : typeof message.content === 'string' ? (
            <p className="text-base">{message.content}</p>
          ) : (
            <ResponseRenderer data={message.content as StructuredResponse} language={language} />
          )}
        </div>
      </div>
       {isUser && (
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center ${avatarClass}`}>
          <i className={`fas ${avatarIcon} text-blue-600 dark:text-blue-300`}></i>
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;